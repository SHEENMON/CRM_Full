from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Department, Manager, Staff, Customer

User = get_user_model()

# ==========================
# User Serializer
# ==========================
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password', 'is_active', 'is_admin']

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user
    

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance


# ==========================
# Department Serializer
# ==========================
class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['id', 'name', 'added_on','user']
        read_only_fields = ['user','added_on']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)
# ==========================
# Manager Serializer
# ==========================
class ManagerSerializer(serializers.ModelSerializer):
    department_name = serializers.CharField(source="department.name", read_only=True)
    class Meta:
        model = Manager
        fields = ['id', 'user','full_name','email', 'department','department_name', 'phone_number', 'team_name', 'added_on', 'is_active']
        read_only_fields = ['user','added_on']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


# ==========================
# Staff Serializer
# ==========================
class StaffSerializer(serializers.ModelSerializer):
    manager_name = serializers.CharField(source="manager.full_name", read_only=True)

    class Meta:
        model = Staff
        fields = ['id', 'user', 'full_name', 'email','manager', 'manager_name', 'skill', 'phone_number', 'added_on', 'is_active']
        read_only_fields = ['user', 'added_on']


    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)



# ==========================
# Customer Serializer
# ==========================
class CustomerSerializer(serializers.ModelSerializer):
    photo_url = serializers.SerializerMethodField()
    class Meta:
        model = Customer
        fields = ['id', 'user','full_name','email', 'gender', 'phone_number', 'photo', 'photo_url', 'date_of_birth', 'added_on', 'is_active']
        read_only_fields = ['user', 'added_on', 'photo_url']
    
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

    def get_photo_url(self, obj):
        request = self.context.get('request')  
        if obj.photo and request:              
            return request.build_absolute_uri(obj.photo.url)  
        return None    
