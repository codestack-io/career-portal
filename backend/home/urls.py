from django.urls import path
from .views import (
    HeroBannerListView,
    AboutSectionListView,
    ServiceSectionListView,
    WhyChooseUsListView,
    UniversityListView,
    TestimonialListView,
    StatisticListView,
    StudyDestinationListView,
    BlogListView,
    FAQListAPIView,
    ContactInformationListAPIView,
    FooterView,
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
    path("blogs/", BlogListView.as_view()),
    path("faqs/", FAQListAPIView.as_view()),
    path("contact/",ContactInformationListAPIView.as_view()),
    path("footer/",FooterView.as_view()),

]