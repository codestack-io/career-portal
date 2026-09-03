from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.conf import settings
from django.conf.urls.static import static

from .views import (
    HeroBannerListView,
    AboutSectionListView,
    ServiceSectionListView,
    WhyChooseUsViewSet,
    UniversityListView,
    TestimonialListView,
    StatisticListView,
    StudyDestinationListView,
    StudyDestinationDetailView,
    BlogListView,
    BlogDetailView,
    FAQListAPIView,
    ContactInformationListAPIView,
    FooterView,
    UserProfileView,
    GoogleLoginView,
    ServiceCategoryViewSet,
    ServiceSectionViewSet,
    ServiceDetailView,
    BlogCategoryListView,
)

# Initialize DRF Router for ViewSets
router = DefaultRouter()
router.register(r"service-categories", ServiceCategoryViewSet, basename="service-category")
router.register(r"services-v2", ServiceSectionViewSet, basename="service-section-v2")
router.register(r"why-choose-us", WhyChooseUsViewSet, basename="why-choose-us") 

urlpatterns = [
    # Services Routes
    path("services/", ServiceSectionListView.as_view(), name="services"),
    path("services/<slug:slug>/", ServiceDetailView.as_view(), name="service-detail"),  # Fixed prefix

    # Public Sections
    path("hero/", HeroBannerListView.as_view(), name="hero"),
    path("about/", AboutSectionListView.as_view(), name="about"),
    path("universities/", UniversityListView.as_view(), name="universities"),
    path("testimonials/", TestimonialListView.as_view(), name="testimonials"),
    path("statistics/", StatisticListView.as_view(), name="statistics"),
    
    # Study Destinations
    path("study-destinations/", StudyDestinationListView.as_view(), name="study-destinations"),
    path("study-destinations/<str:pk>/", StudyDestinationDetailView.as_view(), name="destination-detail"),
    # Blogs
    path("blogs/", BlogListView.as_view(), name="blog-list"),
    path("blogs/categories/", BlogCategoryListView.as_view(), name="blog-category-list"),
    path("blogs/<slug:slug>/", BlogDetailView.as_view(), name="blog-detail"),
    
    # Information & Auth
    path("faqs/", FAQListAPIView.as_view(), name="faqs"),
    path("contact/", ContactInformationListAPIView.as_view(), name="contact"),
    path("footer/", FooterView.as_view(), name="footer"),
    path("profile/", UserProfileView.as_view(), name="user-profile"),
    path("google/", GoogleLoginView.as_view(), name="google-login"),
    path("ckeditor5/", include("django_ckeditor_5.urls")),
    
    # Include router URLs for ViewSets
    path("", include(router.urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)