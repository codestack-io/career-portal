from rest_framework import serializers
from .models import HeroBanner, AboutSection, ServiceSection,WhyChooseUs, University,Testimonial, Statistic


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

class UniversitySerializer(serializers.ModelSerializer):
    class Meta:
        model = University
        fields = "__all__"  

class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = "__all__" 

class StatisticSerializer(serializers.ModelSerializer):
    class Meta:
        model = Statistic
        fields = "__all__"                         