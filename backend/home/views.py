from rest_framework.generics import ListAPIView
from .models import HeroBanner, AboutSection, ServiceSection, WhyChooseUs
from .serializers import HeroBannerSerializer, AboutSectionSerializer ,ServiceSectionSerializer,WhyChooseUsSerializer


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