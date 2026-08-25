from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver


class HeroBanner(models.Model):
    badge = models.CharField(max_length=100, blank=True)

    title = models.CharField(max_length=255)
    subtitle = models.TextField()

    primary_button_text = models.CharField(max_length=100)
    primary_button_link = models.URLField()

    secondary_button_text = models.CharField(max_length=100, blank=True)
    secondary_button_link = models.URLField(blank=True)

    badge_text = models.CharField(max_length=100, blank=True)
    badge_count = models.PositiveIntegerField(default=10000)

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

# 1. New dynamic Category model for services
class ServiceCategory(models.Model):
    name = models.CharField(
        max_length=100, 
        verbose_name="Category Name"
    )
    slug = models.SlugField(
        unique=True, 
        help_text="Unique URL identifier (e.g., 'student-services')"
    )
    display_order = models.PositiveIntegerField(default=1)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["display_order"]
        verbose_name = "Service Category"
        verbose_name_plural = "Service Categories"

    def __str__(self):
        return self.name


# 2. Updated ServiceSection model using ForeignKey
class ServiceSection(models.Model):
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

    # UPDATED: Converted from CharField choices to ForeignKey
    category = models.ForeignKey(
        ServiceCategory,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="services"
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
    is_active = models.BooleanField(default=True)

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

    # UPDATED: Replaced CharField with ForeignKey
    university = models.ForeignKey(
        University,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="testimonials"
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
    name = models.CharField(max_length=100, verbose_name="Country Name")
    short_description = models.TextField()
    full_description = models.TextField(blank=True) # Added
    image = models.URLField(verbose_name="Country Image URL")
    flag = models.URLField(blank=True, verbose_name="Flag URL")
    universities_count = models.PositiveIntegerField(default=0)
    average_tuition = models.CharField(max_length=100, blank=True)
    living_cost = models.CharField(max_length=100, blank=True) # Added
    intakes = models.CharField(max_length=100, blank=True) # Added
    post_study_work = models.CharField(max_length=100, blank=True) # Added
    popular_courses = models.CharField(max_length=255, blank=True, help_text="Separate by commas")
    is_active = models.BooleanField(default=True)
    display_order = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ["display_order"]

    def __str__(self):
        return self.name



class DestinationIntake(models.Model):
    destination = models.ForeignKey(StudyDestination, on_delete=models.CASCADE, related_name='intakes_list')
    intake_name = models.CharField(max_length=100)  # e.g., "Fall Intake"
    months = models.CharField(max_length=100)       # e.g., "Starts in August/September"
    display_order = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ["display_order"]

    def __str__(self):
        return f"{self.destination.name} - {self.intake_name}"


class DestinationProgramDuration(models.Model):
    destination = models.ForeignKey(StudyDestination, on_delete=models.CASCADE, related_name='program_durations')
    program_level = models.CharField(max_length=150) # e.g., "Bachelor's Degree"
    duration = models.CharField(max_length=100)      # e.g., "4 years"
    display_order = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ["display_order"]

    def __str__(self):
        return f"{self.destination.name} - {self.program_level}"


class DestinationCost(models.Model):
    destination = models.ForeignKey(StudyDestination, on_delete=models.CASCADE, related_name='cost_breakdowns')
    program_level = models.CharField(max_length=150) # e.g., "Undergraduate Courses"
    amount_foreign = models.CharField(max_length=100) # e.g., "CAD $20,000 - 35,000"
    amount_local = models.CharField(max_length=100)   # e.g., "19,20,000 - 33,60,000 BDT"
    display_order = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ["display_order"]

    def __str__(self):
        return f"{self.destination.name} - {self.program_level}"


class DestinationCity(models.Model):
    destination = models.ForeignKey(StudyDestination, on_delete=models.CASCADE, related_name='cities')
    name = models.CharField(max_length=100)          # e.g., "Toronto"
    tagline = models.CharField(max_length=255, blank=True) # e.g., "Top universities with global career access"
    image = models.URLField()
    display_order = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ["display_order"]

    def __str__(self):
        return f"{self.destination.name} - {self.name}"


class DestinationWorkOpportunity(models.Model):
    destination = models.ForeignKey(StudyDestination, on_delete=models.CASCADE, related_name='work_opportunities')
    title = models.CharField(max_length=200)        # e.g., "Part-time Work Options"
    description = models.TextField()
    display_order = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ["display_order"]

    def __str__(self):
        return f"{self.destination.name} - {self.title}"
         

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
class Footer(models.Model):
    company_name = models.CharField(max_length=200)

    company_description = models.TextField()

    address = models.CharField(max_length=255)

    phone = models.CharField(max_length=50)

    email = models.EmailField()

    facebook = models.URLField(blank=True)

    instagram = models.URLField(blank=True)

    linkedin = models.URLField(blank=True)

    youtube = models.URLField(blank=True)

    copyright_text = models.CharField(max_length=255)

    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Footer"
        verbose_name_plural = "Footer"

    def __str__(self):
        return self.company_name   

class UserProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name="profile"
    )
    phone = models.CharField(max_length=20, blank=True)
    country_of_interest = models.CharField(max_length=100, blank=True)
    target_degree = models.CharField(max_length=100, blank=True)
    passport_status = models.CharField(max_length=50, blank=True)
    avatar = models.ImageField(upload_to="avatars/", blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        user_identifier = getattr(self.user, 'email', None) or self.user.username
        return f"Profile of {user_identifier}"


# Signal to create or get UserProfile automatically when a User is created/updated
@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)
    else:
        # Prevents errors if older users exist without a profile
        UserProfile.objects.get_or_create(user=instance)     