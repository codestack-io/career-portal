from rest_framework.generics import ListAPIView
from .models import HeroBanner, AboutSection, ServiceSection, WhyChooseUs, University
from .serializers import HeroBannerSerializer, AboutSectionSerializer ,ServiceSectionSerializer,WhyChooseUsSerializer, UniversitySerializer


class HeroBannerListView(ListAPIView):
    queryset = HeroBanner.objects.filter(is_active=True)
    serializer_class = HeroBannerSerializer


class AboutSectionListView(ListAPIView):
    queryset = AboutSection.objects.filter(is_active=True)
    serializer_class = AboutSectionSerializer

class ServiceSectionListView(ListAPIView):
    queryset = ServiceSection.objects.filter(is_active=True)
    serializer_class = ServiceSectionSerializer   

class WhyChooseUsListView(ListAPIView):
    queryset = WhyChooseUs.objects.filter(is_active=True)
    serializer_class = WhyChooseUsSerializer

class UniversityListView(ListAPIView):
    queryset = University.objects.filter(is_featured=True)
    serializer_class = UniversitySerializer    