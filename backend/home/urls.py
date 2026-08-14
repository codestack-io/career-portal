from django.urls import path,include
from django.contrib import admin
 

from .views import (
    HeroBannerListView,
    AboutSectionListView,
    ServiceSectionListView,
    WhyChooseUsListView,
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
    UserProfileView
)

urlpatterns = [
    path("hero/", HeroBannerListView.as_view(), name="hero"),
    path("about/", AboutSectionListView.as_view(), name="about"),
    path("services/", ServiceSectionListView.as_view(), name="services"),
    path("why-choose-us/", WhyChooseUsListView.as_view()),
    path("universities/", UniversityListView.as_view()),
    path("testimonials/", TestimonialListView.as_view()),
    path("statistics/", StatisticListView.as_view()),
    path("study-destinations/",StudyDestinationListView.as_view()),
    path("study-destinations/<int:pk>/", StudyDestinationDetailView.as_view(), name="study-destination-detail"),
    path("blogs/", BlogListView.as_view()),
    path("blogs/<slug:slug>/", BlogDetailView.as_view(), name="blog-detail"),
    path("faqs/", FAQListAPIView.as_view()),
    path("contact/",ContactInformationListAPIView.as_view()),
    path("footer/",FooterView.as_view()),
   
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    

]