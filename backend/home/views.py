from rest_framework.generics import ListAPIView,RetrieveUpdateAPIView,RetrieveAPIView
from .models import HeroBanner, AboutSection, ServiceSection, WhyChooseUs, University, Testimonial, Statistic, StudyDestination, Blog, FAQ,ContactInformation,Footer,UserProfile
from .serializers import HeroBannerSerializer, AboutSectionSerializer ,ServiceSectionSerializer,WhyChooseUsSerializer,UniversitySerializer,TestimonialSerializer, StatisticSerializer,StudyDestinationSerializer,StudyDestinationDetailSerializer, BlogSerializer, FAQSerializer,ContactInformationSerializer,FooterSerializer,UserProfileSerializer
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from django.conf import settings
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from google.oauth2 import id_token
from google.auth.transport import requests

# 1. Import your Authentication Class
from rest_framework_simplejwt.authentication import JWTAuthentication

class HeroBannerListView(ListAPIView):
    queryset = HeroBanner.objects.filter(
        is_active=True
    ).order_by("id")
    serializer_class = HeroBannerSerializer


class AboutSectionListView(ListAPIView):
    queryset = AboutSection.objects.filter(
        is_active=True
    ).order_by("id")
    serializer_class = AboutSectionSerializer

class ServiceSectionListView(ListAPIView):
    queryset = ServiceSection.objects.filter(
        is_active=True
    ).order_by("id")
    serializer_class = ServiceSectionSerializer  

class WhyChooseUsListView(ListAPIView):
    queryset = WhyChooseUs.objects.filter(
        is_active=True
    ).order_by("id")
    serializer_class = WhyChooseUsSerializer

class UniversityListView(ListAPIView):
    queryset = University.objects.filter(
        is_active=True,
        is_featured=True
    ).order_by("id")
    serializer_class = UniversitySerializer 

class TestimonialListView(ListAPIView):
    queryset = Testimonial.objects.filter(
        is_active=True
    ).order_by("id")
    serializer_class = TestimonialSerializer

class StatisticListView(ListAPIView):
    queryset = Statistic.objects.filter(is_active=True)
    serializer_class = StatisticSerializer

class StudyDestinationListView(ListAPIView):
    queryset = StudyDestination.objects.filter(is_active=True)
    serializer_class = StudyDestinationSerializer 

class StudyDestinationDetailView(RetrieveAPIView):
    queryset = StudyDestination.objects.filter(is_active=True)
    serializer_class = StudyDestinationDetailSerializer # <-- MUST BE StudyDestinationDetailSerializer
    lookup_field = "pk"    

class BlogListView(ListAPIView):
    queryset = Blog.objects.filter(is_active=True)
    serializer_class = BlogSerializer      

# ADD THIS: Retrieve a single blog post by its slug
class BlogDetailView(RetrieveAPIView):
    queryset = Blog.objects.filter(is_active=True)
    serializer_class = BlogSerializer
    lookup_field = "slug"

class FAQListAPIView(ListAPIView):
    queryset = FAQ.objects.filter(is_active=True)
    serializer_class = FAQSerializer

class ContactInformationListAPIView(ListAPIView):
    queryset = ContactInformation.objects.filter(is_active=True)
    serializer_class = ContactInformationSerializer

class FooterView(ListAPIView):
    queryset = Footer.objects.filter(
        is_active=True
    ).order_by("id")
    serializer_class = FooterSerializer

class UserProfileView(RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]
    
    # 2. ADD THIS LINE: Explicitly tell DRF to read the Bearer JWT token
    authentication_classes = [JWTAuthentication] 
    
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get_object(self):
        profile, _ = UserProfile.objects.get_or_create(user=self.request.user)
        return profile

class GoogleLoginView(APIView):

    permission_classes = []

    def post(self, request):

        credential = request.data.get("credential")

        if not credential:
            return Response(
                {"detail": "Google credential is required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Verify Google credential
            google_user = id_token.verify_oauth2_token(
                credential,
                requests.Request(),
                settings.GOOGLE_CLIENT_ID,
            )

            email = google_user.get("email")
            first_name = google_user.get("given_name", "")
            last_name = google_user.get("family_name", "")

            if not email:
                return Response(
                    {"detail": "Google account email was not provided."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Find existing user by email
            user = User.objects.filter(email=email).first()

            # Create user if they don't exist
            if not user:

                username = email.split("@")[0]

                # Make username unique
                original_username = username
                counter = 1

                while User.objects.filter(username=username).exists():
                    username = f"{original_username}{counter}"
                    counter += 1

                user = User.objects.create_user(
                    username=username,
                    email=email,
                    first_name=first_name,
                    last_name=last_name,
                )

            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)

            return Response({
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                }
            })

        except ValueError:
            return Response(
                {"detail": "Invalid Google credential."},
                status=status.HTTP_401_UNAUTHORIZED
            )    