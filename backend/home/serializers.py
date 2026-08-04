from rest_framework import serializers
from .models import HeroBanner, AboutSection, ServiceSection,WhyChooseUs


class HeroBannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroBanner
        fields = "__all__"


class AboutSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutSection
        fields = "__all__"


class ServiceSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceSection
        fields = "__all__"

class WhyChooseUsSerializer(serializers.ModelSerializer):
    class Meta:
        model = WhyChooseUs
        fields = "__all__"        