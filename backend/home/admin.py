from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import HeroBanner, AboutSection, ServiceSection, WhyChooseUs, University,Testimonial, Statistic,StudyDestination, Blog, FAQ,ContactInformation,Footer,UserProfile

User = get_user_model()
@admin.register(HeroBanner)
class HeroBannerAdmin(admin.ModelAdmin):
    list_display = ("title", "badge", "is_active")
    list_filter = ("is_active",)
    search_fields = ("title",)


@admin.register(AboutSection)
class AboutSectionAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "years_of_experience",
        "university_partners",
        "students_recruited",
        "is_active",
    )

    list_filter = ("is_active",)
    search_fields = ("title", "subtitle")

@admin.register(ServiceSection)
class ServiceSectionAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "display_order",
        "category",
        "is_active",
    )

    list_filter = ("category", "is_active")
    search_fields = ("title",)
    ordering = ("display_order",)

@admin.register(WhyChooseUs)
class WhyChooseUsAdmin(admin.ModelAdmin):
    list_display = ("title", "display_order", "is_active")
    list_filter = ("is_active",)
    search_fields = ("title",)
    ordering = ("display_order",)  

@admin.register(University)
class UniversityAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "country",
        "is_featured",
        "display_order",
    )

    list_filter = (
        "country",
        "is_featured",
    )

    search_fields = (
        "name",
        "country",
    )

    ordering = (
        "display_order",
    )  

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "university",
        "rating",
        "display_order",
        "is_active",
    )

    list_filter = ("is_active",)

    search_fields = (
        "name",
        "university",
    )

    ordering = ("display_order",) 

@admin.register(Statistic)
class StatisticAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "value",
        "display_order",
        "is_active",
    )

    list_filter = ("is_active",)

    search_fields = ("title",)

    ordering = ("display_order",)  

@admin.register(StudyDestination)
class StudyDestinationAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "universities_count",
        "display_order",
        "is_active",
    )

    list_filter = ("is_active",)

    search_fields = ("name",)

    ordering = ("display_order",)  

@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "author",
        "category",
        "published_date",
        "is_active",
    )

    list_filter = ("category", "is_active")

    search_fields = ("title", "author") 

@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ("question", "display_order", "is_active")
    list_editable = ("display_order", "is_active")
    ordering = ("display_order",)

@admin.register(ContactInformation)
class ContactInformationAdmin(admin.ModelAdmin):
    list_display = (
        "company_name",
        "phone",
        "email",
        "is_active",
    )

    list_editable = ("is_active",)

@admin.register(Footer)
class FooterAdmin(admin.ModelAdmin):
    list_display = ("company_name", "phone", "email", "is_active")
    list_filter = ("is_active",)
    search_fields = ("company_name", "email")

# 1. Define how the UserProfile form looks inside the User page
class UserProfileInline(admin.StackedInline):
    model = UserProfile
    can_delete = False
    verbose_name_plural = 'Profile'
    readonly_fields = ('created_at', 'updated_at')

# 2. Attach the profile inline to the default User admin class
class UserAdmin(BaseUserAdmin):
    inlines = (UserProfileInline,)

# 3. Unregister Django's default User admin and register your customized one
try:
    admin.site.unregister(User)
finally:
    admin.site.register(User, UserAdmin)

# 4. Optional: Also register UserProfile as its own separate section in Admin sidebar
@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'phone', 'country_of_interest', 'target_degree', 'passport_status')
    search_fields = ('user__username', 'user__email', 'phone', 'country_of_interest')
    readonly_fields = ('created_at', 'updated_at')   