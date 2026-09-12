from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import (
    AboutSection,
    Blog,
    BlogCategory,
    ContactInformation,
    CounselingRequest,
    DestinationCity,
    DestinationCost,
    DestinationIntake,
    DestinationProgramDuration,
    DestinationWorkOpportunity,
    Course,
    Scholarship,
    AdmissionRequirement,
    VisaRequirement,
    ApplicationStep,
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
        fields = ["id", "name", "slug"]


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


class CourseSerializer(serializers.ModelSerializer):
    university_name = serializers.CharField(source="university.name", read_only=True)

    class Meta:
        model = Course
        fields = [
            "id",
            "title",
            "slug",
            "degree_level",
            "duration",
            "tuition_fee",
            "currency",
            "entry_requirements",
            "is_active",
            "university",
            "university_name",
        ]

class ScholarshipSerializer(serializers.ModelSerializer):
    # Updated to source="destination.name" to match your StudyDestination model
    destination_name = serializers.CharField(source="destination.name", read_only=True)

    class Meta:
        model = Scholarship
        fields = [
            "id",
            "destination",
            "destination_name",
            "title",
            "offered_by",
            "coverage",
            "eligibility",
            "application_deadline",
            "is_active",
        ]
class AdmissionRequirementSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdmissionRequirement
        fields = "__all__"

class VisaRequirementSerializer(serializers.ModelSerializer):
    class Meta:
        model = VisaRequirement
        fields = "__all__"

class ApplicationStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApplicationStep
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
        fields = ['id', 'title', 'value', 'suffix', 'icon', 'display_order'] 

# Child serializers placed BEFORE parent StudyDestination serializers
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


class StudyDestinationSerializer(serializers.ModelSerializer):
    # REMOVE source='program_durations' here:
    program_durations = DestinationProgramDurationSerializer(many=True, read_only=True)
    
    # Do the same for all other nested fields whose variable names match their related_names:
    intakes_list = DestinationIntakeSerializer(many=True, read_only=True)
    cost_breakdowns = DestinationCostSerializer(many=True, read_only=True)
    scholarships = ScholarshipSerializer(many=True, read_only=True)
    cities = DestinationCitySerializer(many=True, read_only=True)
    admission_requirements = AdmissionRequirementSerializer(many=True, read_only=True)
    visa_info = VisaRequirementSerializer(read_only=True)
    work_opportunities = DestinationWorkOpportunitySerializer(many=True, read_only=True)
    application_process = ApplicationStepSerializer(many=True, read_only=True)

    class Meta:
        model = StudyDestination
        fields = '__all__'


class StudyDestinationDetailSerializer(serializers.ModelSerializer):
    scholarships = ScholarshipSerializer(many=True, read_only=True)
    intakes_list = DestinationIntakeSerializer(
        many=True, read_only=True, source="intakes", default=[]
    )
    program_durations = DestinationProgramDurationSerializer(
        many=True, read_only=True, source="program_durations", default=[]
    )
    cost_breakdowns = DestinationCostSerializer(
        many=True, read_only=True, source="cost_breakdowns", default=[]
    )
    cities = DestinationCitySerializer(
        many=True, read_only=True, source="cities", default=[]
    )
    visa_info = VisaRequirementSerializer(read_only=True)
    work_opportunities = DestinationWorkOpportunitySerializer(
        many=True, read_only=True, source="work_opportunities", default=[]
    )
    application_process = ApplicationStepSerializer(many=True, read_only=True)
    class Meta:
        model = StudyDestination
        fields = "__all__"


class BlogCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogCategory
        fields = ["id", "name", "slug", "is_active"]


class BlogSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    author_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        source="author",
        write_only=True,
        required=False,
    )

    category = BlogCategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=BlogCategory.objects.all(),
        source="category",
        write_only=True,
        required=False,
        allow_null=True,
    )

    featured_image = serializers.SerializerMethodField()
    published_date = serializers.DateField(format="%d/%m/%Y")

    class Meta:
        model = Blog
        fields = "__all__"

    def get_featured_image(self, obj):
        if obj.featured_image:
            request = self.context.get("request")
            if request is not None:
                return request.build_absolute_uri(obj.featured_image.url)
            return obj.featured_image.url
        return None


class CounselingRequestSerializer(serializers.ModelSerializer):
    fullName = serializers.CharField(source="full_name")
    studyLevel = serializers.CharField(source="study_level", required=False)
    preferredDestination = serializers.CharField(
        source="preferred_destination", required=False, allow_blank=True
    )

    class Meta:
        model = CounselingRequest
        fields = [
            "id",
            "fullName",
            "email",
            "phone",
            "studyLevel",
            "preferredDestination",
            "message",
            "created_at",
        ]


class FAQSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(
        source="get_category_display", read_only=True
    )

    class Meta:
        model = FAQ
        fields = [
            "id",
            "question",
            "answer",
            "category",
            "category_display",
            "display_order",
            "is_active",
        ]


class ContactInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInformation
        fields = "__all__"


class FooterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Footer
        fields = "__all__"


class UserProfileSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField(
        source="profile_picture", required=False, allow_null=True
    )

    class Meta:
        model = UserProfile
        fields = [
            "id",
            "phone",
            "address",
            "country_of_interest",
            "target_degree",
            "passport_status",
            "avatar",
            "created_at",
            "updated_at",
        ]