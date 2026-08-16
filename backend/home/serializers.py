from rest_framework import serializers
from .models import HeroBanner, AboutSection, ServiceSection,WhyChooseUs, University,Testimonial, Statistic,StudyDestination,Blog, FAQ,ContactInformation,Footer,UserProfile,StudyDestination,DestinationIntake,DestinationProgramDuration, DestinationCost,DestinationCity,DestinationWorkOpportunity
    
   
from django.contrib.auth import get_user_model

User = get_user_model()
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

class StudyDestinationSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudyDestination
        fields = "__all__"

class DestinationIntakeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DestinationIntake
        fields = ['id', 'intake_name', 'months']

class DestinationProgramDurationSerializer(serializers.ModelSerializer):
    class Meta:
        model = DestinationProgramDuration
        fields = ['id', 'program_level', 'duration']

class DestinationCostSerializer(serializers.ModelSerializer):
    class Meta:
        model = DestinationCost
        fields = ['id', 'program_level', 'amount_foreign', 'amount_local']

class DestinationCitySerializer(serializers.ModelSerializer):
    class Meta:
        model = DestinationCity
        fields = ['id', 'name', 'tagline', 'image']

class DestinationWorkOpportunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = DestinationWorkOpportunity
        fields = ['id', 'title', 'description']

class StudyDestinationDetailSerializer(serializers.ModelSerializer):
    intakes_list = DestinationIntakeSerializer(many=True, read_only=True)
    program_durations = DestinationProgramDurationSerializer(many=True, read_only=True)
    cost_breakdowns = DestinationCostSerializer(many=True, read_only=True)
    cities = DestinationCitySerializer(many=True, read_only=True)
    work_opportunities = DestinationWorkOpportunitySerializer(many=True, read_only=True)

    class Meta:
        model = StudyDestination
        fields = '__all__'
        
class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = "__all__" 

class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = "__all__"
class ContactInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInformation
        fields = "__all__"   

class FooterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Footer
        fields = "__all__"   

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email'] # adjust fields based on your custom user model

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = UserProfile
        fields = [
            'id', 
            'user', 
            'phone', 
            'country_of_interest', 
            'target_degree', 
            'passport_status', 
            'avatar', 
            'updated_at'
        ]        


