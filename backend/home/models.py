from django.db import models


class HeroBanner(models.Model):
    badge = models.CharField(max_length=100, blank=True)

    title = models.CharField(max_length=255)
    subtitle = models.TextField()

    primary_button_text = models.CharField(max_length=100)
    primary_button_link = models.URLField()

    secondary_button_text = models.CharField(max_length=100, blank=True)
    secondary_button_link = models.URLField(blank=True)

    hero_image = models.URLField()

    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Hero Banner"
        verbose_name_plural = "Hero Banners"

    def __str__(self):
        return self.title


class AboutSection(models.Model):
    title = models.CharField(
        max_length=255,
        verbose_name="Title"
    )

    subtitle = models.CharField(
        max_length=255,
        blank=True,
        verbose_name="Subtitle"
    )

    description = models.TextField(
        verbose_name="Description"
    )

    image = models.URLField(
        blank=True,
        verbose_name="Image URL"
    )

    years_of_experience = models.PositiveIntegerField(default=0)

    university_partners = models.PositiveIntegerField(default=0)

    students_recruited = models.PositiveIntegerField(default=0)

    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "About Section"
        verbose_name_plural = "About Sections"

    def __str__(self):
        return self.title

class ServiceSection(models.Model):
    CATEGORY_CHOICES = [
        ("student", "Student Services"),
        ("university", "University Services"),
    ]

    title = models.CharField(
        max_length=255,
        verbose_name="Title"
    )

    description = models.TextField(
        verbose_name="Description"
    )

    icon = models.URLField(
        blank=True,
        verbose_name="Icon URL"
    )

    category = models.CharField(
        max_length=20,
        choices=CATEGORY_CHOICES,
        default="student"
    )

    display_order = models.PositiveIntegerField(default=1)

    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["display_order"]
        verbose_name = "Service"
        verbose_name_plural = "Services"

    def __str__(self):
        return self.title       