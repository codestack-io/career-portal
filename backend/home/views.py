from django.conf import settings
from django.contrib.auth.models import User
from google.auth.transport import requests
from google.oauth2 import id_token
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, status, viewsets,generics
from rest_framework.generics import ListAPIView, RetrieveAPIView, RetrieveUpdateAPIView
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken


from .models import (
    AboutSection,
    Blog,
    ContactInformation,
    FAQ,
    Footer,
    HeroBanner,
    ServiceCategory,
    ServiceSection,
    Statistic,
    StudyDestination,
    Testimonial,
    University,
    UserProfile,
    WhyChooseUs,
    BlogCategory
)
from .serializers import (
    AboutSectionSerializer,
    BlogSerializer,
    ContactInformationSerializer,
    FAQSerializer,
    FooterSerializer,
    HeroBannerSerializer,
    ServiceCategorySerializer,
    ServiceSectionSerializer,
    StatisticSerializer,
    StudyDestinationDetailSerializer,
    StudyDestinationSerializer,
    TestimonialSerializer,
    UniversitySerializer,
    UserProfileSerializer,
    WhyChooseUsSerializer,
    BlogCategorySerializer
)


# --- Public Component Views (No Pagination Needed) ---

class HeroBannerListView(ListAPIView):
    queryset = HeroBanner.objects.filter(is_active=True).order_by("id")
    serializer_class = HeroBannerSerializer
    permission_classes = [AllowAny]
    pagination_class = None


class AboutSectionListView(ListAPIView):
    queryset = AboutSection.objects.filter(is_active=True).order_by("id")
    serializer_class = AboutSectionSerializer
    permission_classes = [AllowAny]
    pagination_class = None


class StatisticListView(ListAPIView):
    queryset = Statistic.objects.filter(is_active=True)
    serializer_class = StatisticSerializer
    permission_classes = [AllowAny]
    pagination_class = None


class FooterView(ListAPIView):
    queryset = Footer.objects.filter(is_active=True).order_by("id")
    serializer_class = FooterSerializer
    permission_classes = [AllowAny]
    pagination_class = None


class FAQListAPIView(ListAPIView):
    queryset = FAQ.objects.filter(is_active=True)
    serializer_class = FAQSerializer
    permission_classes = [AllowAny]
    pagination_class = None


class ContactInformationListAPIView(ListAPIView):
    queryset = ContactInformation.objects.filter(is_active=True)
    serializer_class = ContactInformationSerializer
    permission_classes = [AllowAny]
    pagination_class = None


# --- ViewSets for Services & Why Choose Us ---

class ServiceCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ServiceCategory.objects.filter(is_active=True)
    serializer_class = ServiceCategorySerializer
    permission_classes = [AllowAny]


class ServiceSectionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ServiceSection.objects.filter(is_active=True)
    serializer_class = ServiceSectionSerializer
    permission_classes = [AllowAny]

class ServiceSectionListView(ListAPIView):
    queryset = ServiceSection.objects.filter(is_active=True)
    serializer_class = ServiceSectionSerializer
    permission_classes = [AllowAny]    


class WhyChooseUsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = WhyChooseUs.objects.filter(is_active=True).order_by("display_order")
    serializer_class = WhyChooseUsSerializer
    permission_classes = [AllowAny]
    pagination_class = None


# --- Dynamic Content Views ---

class UniversityListView(ListAPIView):
    queryset = University.objects.filter(is_active=True, is_featured=True).order_by("id")
    serializer_class = UniversitySerializer
    permission_classes = [AllowAny]


class TestimonialListView(ListAPIView):
    queryset = Testimonial.objects.filter(is_active=True).select_related("university").order_by("display_order", "-created_at")
    serializer_class = TestimonialSerializer
    permission_classes = [AllowAny]


class StudyDestinationListView(ListAPIView):
    queryset = StudyDestination.objects.filter(is_active=True)
    serializer_class = StudyDestinationSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['name']
    search_fields = ["name", "short_description", "full_description"]


class StudyDestinationDetailView(RetrieveAPIView):
    queryset = StudyDestination.objects.filter(is_active=True)
    serializer_class = StudyDestinationDetailSerializer
    lookup_field = "pk"
    permission_classes = [AllowAny]

class BlogCategoryListView(ListAPIView):
    queryset = BlogCategory.objects.filter(is_active=True)
    serializer_class = BlogCategorySerializer
    permission_classes = [AllowAny]
    pagination_class = None

class BlogListView(ListAPIView):
    queryset = Blog.objects.select_related("author", "category").filter(is_active=True)
    serializer_class = BlogSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    
    # Filter by category ID or slug, author ID
    filterset_fields = ["category", "category__slug", "author"]
    
    
    search_fields = ["title", "content", "short_description"]
    
    
    ordering_fields = ["published_date", "title"]
    ordering = ["-published_date"] 


class BlogDetailView(RetrieveAPIView):
    queryset = Blog.objects.filter(is_active=True).select_related("author", "category")
    serializer_class = BlogSerializer
    lookup_field = "slug"
    permission_classes = [AllowAny]


# --- Authenticated User Operations ---

class UserProfileView(RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get_object(self):
        profile, _ = UserProfile.objects.get_or_create(user=self.request.user)
        return profile


class GoogleLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        credential = request.data.get("credential")

        if not credential:
            return Response(
                {"detail": "Google credential is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
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
                    status=status.HTTP_400_BAD_REQUEST,
                )

            user = User.objects.filter(email=email).first()

            if not user:
                username = email.split("@")[0]
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
                },
            })

        except ValueError:
            return Response(
                {"detail": "Invalid Google credential."},
                status=status.HTTP_401_UNAUTHORIZED,
            )