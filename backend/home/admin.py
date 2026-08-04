from django.contrib import admin
from .models import HeroBanner, AboutSection, ServiceSection, WhyChooseUs, University,Testimonial, Statistic


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