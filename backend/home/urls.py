from django.urls import path
from .views import HeroBannerListView

urlpatterns = [
    path("hero/", HeroBannerListView.as_view(), name="hero-list"),
]