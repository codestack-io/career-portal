from django.conf import settings
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.text import slugify
from django_ckeditor_5.fields import CKEditor5Field
from django.core.validators import MaxValueValidator, MinValueValidator



class HeroBanner(models.Model):
    badge = models.CharField(max_length=100, blank=True)
    title = models.CharField(max_length=255)
    subtitle = models.TextField()
    primary_button_text = models.CharField(max_length=100)
    primary_button_link = models.CharField(max_length=500, blank=True, null=True)
    secondary_button_text = models.CharField(max_length=100, blank=True)
    secondary_button_link = models.CharField(max_length=500, blank=True, null=True)
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
    title = models.CharField(max_length=255, verbose_name="Title")
    subtitle = models.CharField(max_length=255, blank=True, verbose_name="Subtitle")
    description = CKEditor5Field("Description", config_name="extends")
    image = models.URLField(blank=True, verbose_name="Image URL")
    years_of_experience = models.PositiveIntegerField(default=0)
    university_partners = models.PositiveIntegerField(default=0)
    students_recruited = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "About Section"
        verbose_name_plural = "About Sections"

    def __str__(self):
        return self.title


class ServiceCategory(models.Model):
    CATEGORY_CHOICES = [
        ('admissions', 'University Admission & Course Selection'),
        ('scholarships', 'Scholarship & Financial Aid Assistance'),
        ('visa_guidance', 'Visa Processing & Interview Prep'),
        ('test_prep', 'English Proficiency & Test Preparation'),
        ('career_counseling', 'Career Counseling & Profile Building'),
        ('accommodation', 'Student Accommodation & Arrival Support'),
        ('travel_insurance', 'Travel, Health & Medical Insurance'),
        ('post_study_work', 'Post-Study Work & Migration Guidance'),
    ]

    name = models.CharField(
        max_length=100, 
        verbose_name="Category Name"
    )
    slug = models.SlugField(
        unique=True,
        blank=True,
        help_text="Unique URL identifier (e.g., 'student-services')",
    )
    parent = models.ForeignKey(
        'self',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='subcategories',
        verbose_name="Parent Category"
    )
    description = models.TextField(
        blank=True, 
        help_text="Brief category overview for frontend headers"
    )
    icon = models.ImageField(
        upload_to="categories/icons/",
        blank=True,
        null=True,
        help_text="Upload a category icon image (e.g., PNG, SVG, or WEBP)"
    )
    display_order = models.PositiveIntegerField(default=1)
    is_active = models.BooleanField(default=True)
    
    # Metadata for SEO routing
    meta_title = models.CharField(max_length=150, blank=True)
    meta_description = models.TextField(blank=True)

    class Meta:
        ordering = ["display_order", "name"]
        verbose_name = "Service Category"
        verbose_name_plural = "Service Categories"

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.name)
            slug = base_slug
            count = 1
           
            while ServiceCategory.objects.filter(slug=slug).exclude(id=self.id).exists():
                slug = f"{base_slug}-{count}"
                count += 1
            self.slug = slug
        super().save(*args, **kwargs)

    def __str__(self):
        if self.parent:
            return f"{self.parent.name} → {self.name}"
        return self.name


class ServiceSection(models.Model):
    title = models.CharField(max_length=255, verbose_name="Title")
    slug = models.SlugField(
        unique=True, 
        blank=True, 
        help_text="Unique URL slug (e.g. visa-documentation-and-file-audit)"
    )
    description = CKEditor5Field("Description", config_name="extends")
    icon = models.ImageField(
        upload_to="services/icons/",
        blank=True,
        null=True,
        verbose_name="Icon Image",
    )
    category = models.ForeignKey(
        ServiceCategory,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="services",
    )
    display_order = models.PositiveIntegerField(default=1)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["display_order"]
        verbose_name = "Service"
        verbose_name_plural = "Services"

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title) if self.title else "service"
            slug = base_slug
            count = 1
            # Prevent duplicate slugs if multiple services share the same title
            while ServiceSection.objects.filter(slug=slug).exclude(id=self.id).exists():
                slug = f"{base_slug}-{count}"
                count += 1
            self.slug = slug
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

class WhyChooseUs(models.Model):
    title = models.CharField(max_length=255, verbose_name="Title")
    description = models.TextField(verbose_name="Description")
    
    icon = models.ImageField(
        upload_to="why_choose_us_icons/", 
        blank=True, 
        null=True, 
        verbose_name="Icon Image"
    )
    
    display_order = models.PositiveIntegerField(default=1, verbose_name="Display Order")
    is_active = models.BooleanField(default=True, verbose_name="Is Active")
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["display_order"]
        verbose_name = "Why Choose Us"
        verbose_name_plural = "Why Choose Us"

    def __str__(self):
        return self.title


class University(models.Model):
    name = models.CharField(max_length=255, verbose_name="University Name")
    country = models.CharField(max_length=100)
    logo = models.URLField(blank=True, verbose_name="Logo URL")
    website = models.URLField(blank=True)
    short_description = models.TextField(blank=True)
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
    designation = models.CharField(max_length=150, blank=True)
    university = models.ForeignKey(
        "University",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="testimonials",
    )
    
    image = models.ImageField(
        upload_to="testimonials/", blank=True, null=True, verbose_name="Student Image"
    )
    feedback = models.TextField()
    rating = models.PositiveSmallIntegerField(
        default=5, validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    is_active = models.BooleanField(default=True)
    display_order = models.PositiveIntegerField(default=1)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["display_order", "-created_at"]
        verbose_name = "Testimonial"
        verbose_name_plural = "Testimonials"

    def __str__(self):
        return f"{self.name} - {self.university or 'General'}"


class Statistic(models.Model):
    title = models.CharField(max_length=100, verbose_name="Statistic Title")
    value = models.CharField(max_length=50, verbose_name="Statistic Value")
    icon = models.URLField(blank=True, verbose_name="Icon URL")
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
    slug = models.SlugField(max_length=255, unique=True, null=True, blank=True)
    short_description = models.TextField()
    full_description = CKEditor5Field("Full Description", config_name="extends", blank=True)
    
    image = models.ImageField(upload_to="destinations/", verbose_name="Country Image")
    universities_count = models.PositiveIntegerField(default=0)
    popular_courses = models.JSONField(default=list, blank=True, help_text="e.g. ['CS', 'MBA']")
    
    is_active = models.BooleanField(default=True)
    display_order = models.PositiveIntegerField(default=1)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["display_order"]

    def save(self, *args, **kwargs):
        if not self.slug and self.name:
            from django.utils.text import slugify
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class DestinationIntake(models.Model):
    destination = models.ForeignKey(
        StudyDestination, on_delete=models.CASCADE, related_name="intakes_list"
    )
    intake_name = models.CharField(max_length=100)
    months = models.CharField(max_length=100)
    display_order = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ["display_order"]

    def __str__(self):
        return f"{self.destination.name} - {self.intake_name}"


class DestinationProgramDuration(models.Model):
    destination = models.ForeignKey(
        StudyDestination, on_delete=models.CASCADE, related_name="program_durations"
    )
    
    PROGRAM_LEVEL_CHOICES = [
        ('bachelors', "Bachelor's Degree"),
        ('masters', "Master's Degree"),
        ('phd', "Doctorate / PhD"),
        ('diploma', "Diploma"),
    ]
    program_level = models.CharField(max_length=50, choices=PROGRAM_LEVEL_CHOICES)
    duration = models.CharField(max_length=100, help_text="e.g., '3-4 Years'")
    display_order = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ["display_order"]

    def __str__(self):
        return f"{self.destination.name} - {self.get_program_level_display()}"


class DestinationCost(models.Model):
    destination = models.ForeignKey(
        StudyDestination, on_delete=models.CASCADE, related_name="cost_breakdowns"
    )
    program_level = models.CharField(
        max_length=50, choices=DestinationProgramDuration.PROGRAM_LEVEL_CHOICES
    )
    
    amount_foreign = models.DecimalField(max_digits=10, decimal_places=2, help_text="Amount in original currency")
    currency_code = models.CharField(max_length=10, default="USD", help_text="e.g., USD, AUD, GBP")
    amount_local = models.DecimalField(max_digits=12, decimal_places=2, help_text="Amount in local currency")
    
    display_order = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ["display_order"]

    def __str__(self):
        return f"{self.destination.name} - {self.get_program_level_display()}"


class DestinationCity(models.Model):
    destination = models.ForeignKey(
        StudyDestination, on_delete=models.CASCADE, related_name="cities"
    )
    name = models.CharField(max_length=100)
    tagline = models.CharField(max_length=255, blank=True)
    image = models.ImageField(upload_to="destinations/cities/")
    display_order = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ["display_order"]

    def __str__(self):
        return f"{self.destination.name} - {self.name}"


class DestinationWorkOpportunity(models.Model):
    destination = models.ForeignKey(
        StudyDestination, on_delete=models.CASCADE, related_name="work_opportunities"
    )
    title = models.CharField(max_length=200)
    description = CKEditor5Field("Description", config_name="extends")
    display_order = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ["display_order"]

    def __str__(self):
        return f"{self.destination.name} - {self.title}"

class BlogCategory(models.Model):
    name = models.CharField(max_length=100, verbose_name="Category Name")
    slug = models.SlugField(
        unique=True,
        blank=True,
        help_text="Unique URL identifier",
    )
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Blog Category"
        verbose_name_plural = "Blog Categories"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Blog(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True)
    short_description = models.TextField(blank=True, verbose_name="Short Description (Optional)")
    content = CKEditor5Field("Text", config_name="extends")
    
    
    featured_image = models.ImageField(
        upload_to="blogs/", 
        blank=True, 
        null=True, 
        verbose_name="Featured Image"
    )
    
    
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="blogs",
    )
    published_date = models.DateField()
    
    category = models.ForeignKey(
        BlogCategory,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="blogs",
    )
    
    read_time = models.CharField(
        max_length=30, help_text="Example: 5 min read"
    )
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["-published_date"]
        verbose_name = "Blog"
        verbose_name_plural = "Blogs"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

class FAQ(models.Model):
    CATEGORY_CHOICES = [
        ('general', 'General'),
        ('admissions', 'Admission Guidance'),
        ('scholarships', 'Scholarships'),
        ('visa', 'Visa Process'),
    ]

    question = models.CharField(max_length=255)
    answer = CKEditor5Field("Answer", config_name="extends")
    category = models.CharField(
        max_length=50, 
        choices=CATEGORY_CHOICES, 
        default='general'
    )
    display_order = models.PositiveIntegerField(default=1)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["display_order"]
        verbose_name = "FAQ"
        verbose_name_plural = "FAQs"

    def __str__(self):
        return f"[{self.get_category_display()}] {self.question}"


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

    class Meta:
        verbose_name = "Contact Information"
        verbose_name_plural = "Contact Information"

    def __str__(self):
        return self.company_name


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
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="profile"
    )
    phone = models.CharField(max_length=20, blank=True)
    country_of_interest = models.CharField(max_length=100, blank=True)
    target_degree = models.CharField(max_length=100, blank=True)
    passport_status = models.CharField(max_length=50, blank=True)
    avatar = models.ImageField(upload_to="avatars/", blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        user_identifier = getattr(self.user, "email", None) or self.user.username
        return f"Profile of {user_identifier}"


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)
    else:
        UserProfile.objects.get_or_create(user=instance)