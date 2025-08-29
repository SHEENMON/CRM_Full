from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    # ==========================
    # Admin Authentication
    # ==========================
    path('api/admin/login/', views.admin_login, name='admin_login'),
    path('api/admin/logout/', views.admin_logout, name='admin_logout'),

    # ==========================
    # Dashboard Stats
    # ==========================
    path('api/dashboard-stats/', views.dashboard_stats, name='dashboard_stats'),
    path('api/admin/', views.current_user, name='current_user'),

    # ==========================
    # Departments CRUD
    # ==========================
    path('api/departments/', views.departments_list_create, name='departments_list_create'),
    path('api/departments/<int:department_id>/', views.department_detail, name='department_detail'),

    # ==========================
    # Managers CRUD
    # ==========================
    path('api/managers/', views.managers_list_create, name='managers_list_create'),
    path('api/managers/<int:manager_id>/', views.manager_detail, name='manager_detail'),

    # ==========================
    # Staffs CRUD
    # ==========================
    path('api/staffs/', views.staffs_list_create, name='staffs_list_create'),
    path('api/staffs/<int:staff_id>/', views.staff_detail, name='staff_detail'),

    # ==========================
    # Customers CRUD
    # ==========================
    path('api/customers/', views.customers_list_create, name='customers_list_create'),
    path('api/customers/<int:customer_id>/', views.customer_detail, name='customer_detail'),

    # ==========================
    # Toggle User Status
    # ==========================
    path("api/toggle-status/<str:role>/<int:obj_id>/", views.toggle_manager_staff_status, name="toggle_manager_staff_status"),


]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)