from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND, HTTP_403_FORBIDDEN
from django.contrib.auth import authenticate, login, logout, get_user_model
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from rest_framework.authtoken.models import Token
from .models import User, Department, Manager, Staff, Customer
from .serializers import (
    UserSerializer, DepartmentSerializer, ManagerSerializer,
    StaffSerializer, CustomerSerializer
)

User = get_user_model()

# ==========================
# Admin Authentication
# ==========================
@csrf_exempt
@api_view(["POST"])
@permission_classes([AllowAny])
def admin_login(request):
    email = request.data.get("email")
    password = request.data.get("password")
    if email is None or password is None:
        return Response({'error': 'Provide email and password'}, status=HTTP_400_BAD_REQUEST)

    user = authenticate(request, username=email, password=password)
    if not user or not user.is_admin:
        return Response({'error': 'Invalid credentials or not admin'}, status=HTTP_403_FORBIDDEN)

    login(request, user)
    token, _ = Token.objects.get_or_create(user=user)
    return Response({
        'message': 'Logged in successfully',
        'token': token.key  
    }, status=HTTP_200_OK)



@login_required
def admin_logout(request):
    logout(request)
    return redirect('admin_login')


# ==========================
# Dashboard Stats
# ==========================
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard_stats(request):
    data = {
        "total_departments": Department.objects.count(),
        "total_managers": Manager.objects.filter(is_active=True).count(),
        "total_staffs": Staff.objects.filter(is_active=True).count(),
        "total_customers": Customer.objects.filter(is_active=True).count(),
    }
    return Response(data, status=HTTP_200_OK)

# ==========================
# Current Admin
# ==========================
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user(request):
    """
    Returns the currently logged-in user's details.
    """
    serializer = UserSerializer(request.user)
    return Response(serializer.data, status=HTTP_200_OK)

# ==========================
# Departments CRUD
# ==========================
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def departments_list_create(request):
    if request.method == 'GET':
        departments = Department.objects.all()
        serializer = DepartmentSerializer(departments, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = DepartmentSerializer(data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


@api_view(["GET",'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def department_detail(request, department_id):
    department = get_object_or_404(Department, id=department_id)
    if request.method == 'GET':
        serializer = DepartmentSerializer(department, context={'request': request})
        return Response(serializer.data)
    if request.method == 'PUT':
        serializer = DepartmentSerializer(department, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        department.delete()
        return Response({'message': 'Department deleted successfully'})


# ==========================
# Manager CRUD
# ==========================
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def managers_list_create(request):
    if request.method == 'GET':
        managers = Manager.objects.select_related('user', 'department').all()
        serializer = ManagerSerializer(managers, many=True,context={'request': request})
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = ManagerSerializer(data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


@api_view(['GET','PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def manager_detail(request, manager_id):
    manager = get_object_or_404(Manager, id=manager_id)
    if request.method == 'GET':
        serializer = ManagerSerializer(manager, context={'request': request})
        return Response(serializer.data)
    if request.method == 'PUT':
        serializer = ManagerSerializer(manager, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        manager.delete()
        return Response({'message': 'Manager deleted successfully'})


# ==========================
# Staff CRUD
# ==========================
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def staffs_list_create(request):
    if request.method == 'GET':
        staffs = Staff.objects.select_related('user', 'manager').all()
        serializer = StaffSerializer(staffs, many=True,context={'request': request})
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = StaffSerializer(data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def staff_detail(request, staff_id):
    staff = get_object_or_404(Staff, id=staff_id)
    if request.method == 'GET':
        serializer = StaffSerializer(staff, context={'request': request})
        return Response(serializer.data)
    if request.method == 'PUT':
        serializer = StaffSerializer(staff, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        staff.delete()
        return Response({'message': 'Staff deleted successfully'})


# ==========================
# Customer CRUD
# ==========================
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def customers_list_create(request):
    if request.method == 'GET':
        customers = Customer.objects.select_related('user').all()
        serializer = CustomerSerializer(customers, many=True, context={'request': request})
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = CustomerSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)



@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def customer_detail(request, customer_id):
    customer = get_object_or_404(Customer, id=customer_id)

    if request.method == 'GET':
        serializer = CustomerSerializer(customer, context={'request': request})
        return Response(serializer.data)  # Return customer data

    elif request.method == 'PUT':
        serializer = CustomerSerializer(customer, data=request.data,context={'request': request}, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        customer.delete()
        return Response({'message': 'Customer deleted successfully'})


# ==========================
# Toggle Active Status for any user
# ==========================
@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def toggle_manager_staff_status(request, role, obj_id):
    """
    API endpoint to toggle Manager/Staff active status.
    Only works for Manager and Staff (not User/Customer).
    """

    model_map = {
        "manager": Manager,
        "staff": Staff,
    }

    if role not in model_map:
        return Response({"error": "Invalid role type"}, status=HTTP_400_BAD_REQUEST)

    model = model_map[role]
    obj = get_object_or_404(model, id=obj_id)

    # Toggle status
    obj.is_active = not obj.is_active
    obj.save()

    status_text = "activated" if obj.is_active else "deactivated"

    return Response({
        "id": obj.id,
        "role": role,
        "is_active": obj.is_active,
        "status": status_text
    }, status=HTTP_200_OK)


# ==========================
# List all users (non-admin)
# ==========================
@login_required
def all_users(request):
    users = User.objects.filter(is_admin=False)
    return render(request, "user_details.html", {"users": users})

# ==========================
# Search
# ==========================

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def search_customers(request):
    query = request.query_params.get('q', '')
    customers = Customer.objects.select_related('user').filter(
        user__name__icontains=query
    )
    serializer = CustomerSerializer(customers, many=True)
    return Response(serializer.data, status=HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def search_staffs(request):
    query = request.query_params.get('q', '')
    staffs = Staff.objects.select_related('user', 'manager').filter(
        user__name__icontains=query
    )
    serializer = StaffSerializer(staffs, many=True)
    return Response(serializer.data, status=HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def search_managers(request):
    query = request.query_params.get('q', '')
    managers = Manager.objects.select_related('user', 'department').filter(
        user__name__icontains=query
    )
    serializer = ManagerSerializer(managers, many=True)
    return Response(serializer.data, status=HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def search_departments(request):
    query = request.query_params.get('q', '')
    departments = Department.objects.filter(name__icontains=query)
    serializer = DepartmentSerializer(departments, many=True)
    return Response(serializer.data, status=HTTP_200_OK)

@login_required
def search_users(request):
    query = request.GET.get('q', '')
    users = User.objects.filter(is_admin=False, name__icontains=query)
    return render(request, "user_details.html", {"users": users})

