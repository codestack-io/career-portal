from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.conf import settings
from django.conf.urls.static import static

from .views import (
    CounselingRequestCreateView,
    HeroBannerListView,
    AboutSectionListView,
    ServiceSectionListView,
    WhyChooseUsViewSet,
    UniversityViewSet,  
    TestimonialListView,
    CourseViewSet,
    ScholarshipViewSet,
    VisaRequirementViewSet,
    ApplicationStepViewSet,
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
router.register(r"courses", CourseViewSet, basename="course")
router.register(r"scholarships", ScholarshipViewSet, basename="scholarship")
router.register(r"visa-requirements", VisaRequirementViewSet, basename="visa-requirement")
router.register(r"application-steps", ApplicationStepViewSet, basename="application-step")
router.register(r"universities", UniversityViewSet, basename="university") # <-- 2. Register UniversityViewSet here!

urlpatterns = [
    # Services Routes
    path("services/", ServiceSectionListView.as_view(), name="services"),
    path("services/<slug:slug>/", ServiceDetailView.as_view(), name="service-detail"),

    # Public Sections
    path("hero/", HeroBannerListView.as_view(), name="hero"),
    path("about/", AboutSectionListView.as_view(), name="about"),
    # REMOVED path("universities/", ...): The router now handles both /api/universities/ and /api/universities/<slug>/
    path("testimonials/", TestimonialListView.as_view(), name="testimonials"),
    path("statistics/", StatisticListView.as_view(), name="statistics"),
    path('counseling-requests/', CounselingRequestCreateView.as_view(), name='counseling-requests'),
    
    # Study Destinations
    path("study-destinations/", StudyDestinationListView.as_view(), name="study-destinations"),
    path("api/study-destinations/<slug:slug>/", StudyDestinationDetailView.as_view(), name="destination-detail"),
    
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