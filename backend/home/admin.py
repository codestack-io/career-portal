from django.contrib import admin
from .models import HeroBanner, AboutSection, ServiceSection, WhyChooseUs


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