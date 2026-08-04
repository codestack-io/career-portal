from django.urls import path
from .views import (
    HeroBannerListView,
    AboutSectionListView,
    ServiceSectionListView,
    WhyChooseUsListView,
    UniversityListView
)

urlpatterns = [
    path("hero/", HeroBannerListView.as_view(), name="hero"),
    path("about/", AboutSectionListView.as_view(), name="about"),
    path("services/", ServiceSectionListView.as_view(), name="services"),
    path("why-choose-us/", WhyChooseUsListView.as_view()),
    path("universities/", UniversityListView.as_view()),
]