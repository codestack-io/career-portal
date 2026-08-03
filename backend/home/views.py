from django.shortcuts import render

from rest_framework.generics import ListAPIView
from .models import HeroBanner
from .serializers import HeroBannerSerializer


class HeroBannerListView(ListAPIView):
    queryset = HeroBanner.objects.all()
    serializer_class = HeroBannerSerializer
