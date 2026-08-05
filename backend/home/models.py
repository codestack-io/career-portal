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

class WhyChooseUs(models.Model):
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

    display_order = models.PositiveIntegerField(default=1)

    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["display_order"]
        verbose_name = "Why Choose Us"
        verbose_name_plural = "Why Choose Us"

    def __str__(self):
        return self.title 

class University(models.Model):
    name = models.CharField(
        max_length=255,
        verbose_name="University Name"
    )

    country = models.CharField(
        max_length=100
    )

    logo = models.URLField(
        blank=True,
        verbose_name="Logo URL"
    )

    website = models.URLField(
        blank=True
    )

    short_description = models.TextField(
        blank=True
    )

    is_featured = models.BooleanField(default=True)

    display_order = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ["display_order"]
        verbose_name = "University"
        verbose_name_plural = "Universities"

    def __str__(self):
        return self.name  

class Testimonial(models.Model):
    name = models.CharField(max_length=150)

    designation = models.CharField(
        max_length=150,
        blank=True
    )

    university = models.CharField(
        max_length=200,
        blank=True
    )

    feedback = models.TextField()

    image = models.URLField(
        blank=True,
        verbose_name="Student Image URL"
    )

    rating = models.PositiveSmallIntegerField(default=5)

    is_active = models.BooleanField(default=True)

    display_order = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ["display_order"]
        verbose_name = "Testimonial"
        verbose_name_plural = "Testimonials"

    def __str__(self):
        return self.name

class Statistic(models.Model):
    title = models.CharField(
        max_length=100,
        verbose_name="Statistic Title"
    )

    value = models.CharField(
        max_length=50,
        verbose_name="Statistic Value"
    )

    icon = models.URLField(
        blank=True,
        verbose_name="Icon URL"
    )

    display_order = models.PositiveIntegerField(default=1)

    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["display_order"]
        verbose_name = "Statistic"
        verbose_name_plural = "Statistics"

    def __str__(self):
        return self.title   

class StudyDestination(models.Model):
    name = models.CharField(
        max_length=100,
        verbose_name="Country Name"
    )

    short_description = models.TextField()

    image = models.URLField(
        verbose_name="Country Image URL"
    )

    flag = models.URLField(
        blank=True,
        verbose_name="Flag URL"
    )

    universities_count = models.PositiveIntegerField(default=0)

    average_tuition = models.CharField(
        max_length=100,
        blank=True
    )

    popular_courses = models.CharField(
        max_length=255,
        blank=True,
        help_text="Separate by commas"
    )

    is_active = models.BooleanField(default=True)

    display_order = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ["display_order"]
        verbose_name = "Study Destination"
        verbose_name_plural = "Study Destinations"

    def __str__(self):
        return self.name 

class Blog(models.Model):
    title = models.CharField(max_length=255)

    slug = models.SlugField(unique=True)

    short_description = models.TextField()

    content = models.TextField()

    featured_image = models.URLField()

    author = models.CharField(max_length=100)

    published_date = models.DateField()

    category = models.CharField(max_length=100)

    read_time = models.CharField(
        max_length=30,
        help_text="Example: 5 min read"
    )

    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["-published_date"]
        verbose_name = "Blog"
        verbose_name_plural = "Blogs"

    def __str__(self):
        return self.title   

class FAQ(models.Model):
    question = models.CharField(max_length=255)

    answer = models.TextField()

    display_order = models.PositiveIntegerField(default=1)

    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["display_order"]
        verbose_name = "FAQ"
        verbose_name_plural = "FAQs"

    def __str__(self):
        return self.question   

class ContactInformation(models.Model):
    company_name = models.CharField(max_length=200)

    address = models.TextField()

    phone = models.CharField(max_length=50)

    email = models.EmailField()

    website = models.URLField(blank=True)

    office_hours = models.CharField(max_length=200)

    google_map = models.URLField(blank=True)

    facebook = models.URLField(blank=True)

    instagram = models.URLField(blank=True)

    linkedin = models.URLField(blank=True)

    youtube = models.URLField(blank=True)

    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.company_name

    class Meta:
        verbose_name = "Contact Information"
        verbose_name_plural = "Contact Information"