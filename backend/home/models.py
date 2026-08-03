from django.db import models


class HeroBanner(models.Model):
    badge = models.CharField(max_length=100, blank=True)

    title = models.CharField(max_length=255)
    subtitle = models.TextField()

    primary_button_text = models.CharField(max_length=100)
    primary_button_link = models.CharField(max_length=255)

    secondary_button_text = models.CharField(max_length=100, blank=True)
    secondary_button_link = models.CharField(max_length=255, blank=True)

    hero_image = models.URLField(blank=True)

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title