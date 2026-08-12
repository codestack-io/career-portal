from rest_framework.generics import ListAPIView
from .models import HeroBanner, AboutSection, ServiceSection, WhyChooseUs, University, Testimonial, Statistic, StudyDestination, Blog, FAQ,ContactInformation,Footer
from .serializers import HeroBannerSerializer, AboutSectionSerializer ,ServiceSectionSerializer,WhyChooseUsSerializer,UniversitySerializer,TestimonialSerializer, StatisticSerializer,StudyDestinationSerializer, BlogSerializer, FAQSerializer,ContactInformationSerializer,FooterSerializer


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

class BlogListView(ListAPIView):
    queryset = Blog.objects.filter(is_active=True)
    serializer_class = BlogSerializer      

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