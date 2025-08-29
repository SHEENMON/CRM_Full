from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models


# ==========================
# Custom User Model
# ==========================
class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Users must have an email address")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)  # Hash password properly
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_admin", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)  

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def __str__(self):
        return self.email

    @property
    def is_staff(self):
        return self.is_admin



# ==========================
# Department Model
# ==========================
class Department(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,default=1,related_name="departments")
    name = models.CharField(max_length=100)
    added_on = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name


# ==========================
# Manager Model
# ==========================

class Manager(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="managers")
    full_name = models.CharField(max_length=50, default='Unknown')
    email = models.EmailField(unique=True, null=True, blank=True)
    department = models.ForeignKey(Department, on_delete=models.SET_NULL,default='HR',null=True, related_name='managers')
    phone_number = models.CharField(max_length=15, blank=True)
    team_name = models.CharField(max_length=50)
    added_on = models.DateField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.user.name} - {self.team_name}"


# ==========================
# Staff Model
# ==========================
class Staff(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="staffs")
    full_name = models.CharField(max_length=50, default='Unknown')
    email = models.EmailField(unique=True, null=True, blank=True)
    manager = models.ForeignKey(Manager, on_delete=models.SET_NULL, null=True, related_name='staffs')
    skill = models.CharField(max_length=40,default='unknown')
    phone_number = models.CharField(max_length=15, blank=True)
    added_on = models.DateField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.user.name


# ==========================
# Customer Model
# ==========================
GENDER_CHOICES = (
    ('MALE', 'Male'),
    ('FEMALE', 'Female'),
    ('OTHER', 'Other')
)

class Customer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="customers")
    full_name = models.CharField(max_length=50, default='Unknown')
    email = models.EmailField(unique=True, null=True, blank=True)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    phone_number = models.CharField(max_length=15)
    photo = models.ImageField(upload_to='customer_photos/', blank=True, null=True)
    date_of_birth = models.DateField()
    added_on = models.DateField(auto_now_add=True) 
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.user.name


# ==========================
# Dashboard Helper Functions
# ==========================
def get_dashboard_counts():
    return {
        "total_managers": Manager.objects.filter(is_active=True).count(),
        "total_staffs": Staff.objects.filter(is_active=True).count(),
        "total_customers": Customer.objects.filter(is_active=True).count(),
        "total_departments": Department.objects.count()
    }
