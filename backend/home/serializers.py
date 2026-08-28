from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import (
    AboutSection,
    Blog,
    ContactInformation,
    DestinationCity,
    DestinationCost,
    DestinationIntake,
    DestinationProgramDuration,
    DestinationWorkOpportunity,
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
)

User = get_user_model()


# Placed higher so other serializers can reference it directly
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email"]


class HeroBannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroBanner
        fields = "__all__"


class AboutSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutSection
        fields = "__all__"


class ServiceCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceCategory
        fields = "__all__"


class ServiceSectionSerializer(serializers.ModelSerializer):
    category = ServiceCategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=ServiceCategory.objects.all(),
        source="category",
        write_only=True,
        required=False,
    )

    class Meta:
        model = ServiceSection
        fields = "__all__"


class WhyChooseUsSerializer(serializers.ModelSerializer):
    # Returns full image URL (e.g., http://127.0.0.1:8000/media/why_choose_us_icons/...)
    icon = serializers.SerializerMethodField()

    class Meta:
        model = WhyChooseUs
        fields = ["id", "title", "description", "icon", "display_order", "is_active"]

    def get_icon(self, obj):
        if obj.icon:
            request = self.context.get('request')
            if request is not None:
                return request.build_absolute_uri(obj.icon.url)
            return obj.icon.url
        return None


class UniversitySerializer(serializers.ModelSerializer):
    class Meta:
        model = University
        fields = "__all__"


class TestimonialSerializer(serializers.ModelSerializer):
    university = UniversitySerializer(read_only=True)
    university_id = serializers.PrimaryKeyRelatedField(
        queryset=University.objects.all(),
        source="university",
        write_only=True,
        required=False,
    )

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
        fields = ["id", "intake_name", "months"]


class DestinationProgramDurationSerializer(serializers.ModelSerializer):
    class Meta:
        model = DestinationProgramDuration
        fields = ["id", "program_level", "duration"]


class DestinationCostSerializer(serializers.ModelSerializer):
    class Meta:
        model = DestinationCost
        fields = ["id", "program_level", "amount_foreign", "amount_local"]


class DestinationCitySerializer(serializers.ModelSerializer):
    class Meta:
        model = DestinationCity
        fields = ["id", "name", "tagline", "image"]


class DestinationWorkOpportunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = DestinationWorkOpportunity
        fields = ["id", "title", "description"]


class StudyDestinationDetailSerializer(serializers.ModelSerializer):
    intakes_list = DestinationIntakeSerializer(many=True, read_only=True)
    program_durations = DestinationProgramDurationSerializer(
        many=True, read_only=True
    )
    cost_breakdowns = DestinationCostSerializer(many=True, read_only=True)
    cities = DestinationCitySerializer(many=True, read_only=True)
    work_opportunities = DestinationWorkOpportunitySerializer(
        many=True, read_only=True
    )

    class Meta:
        model = StudyDestination
        fields = "__all__"


class BlogSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    author_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        source="author",
        write_only=True,
        required=False,
    )
    published_date = serializers.DateField(format="%d/%m/%Y")

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


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    updated_at = serializers.DateTimeField(format="%d/%m/%Y %H:%M", read_only=True)

    class Meta:
        model = UserProfile
        fields = [
            "id",
            "user",
            "phone",
            "country_of_interest",
            "target_degree",
            "passport_status",
            "avatar",
            "updated_at",
        ]