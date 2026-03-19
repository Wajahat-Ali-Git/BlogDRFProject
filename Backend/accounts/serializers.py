from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()


# Registration Serializer
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["username", "email", "password"]

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
        )
        return user


# Login with email serializer
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    # tell SimpleJWT to treat username as the login field (but we'll use it as email)
    username_field = "username"

    def validate(self, attrs):
        email = attrs.get(
            self.username_field
        )  # frontend sends email in "username" field
        password = attrs.get("password")

        if email and password:
            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                raise serializers.ValidationError("Invalid email or password")

            # authenticate using email as username (since USERNAME_FIELD = "email")
            user = authenticate(username=email, password=password)
            if user is None:
                raise serializers.ValidationError("Invalid email or password")
        else:
            raise serializers.ValidationError("Must include email and password")

        # Call super with username (required by SimpleJWT internally)
        data = super().validate(
            {
                "username": email,  # use email since USERNAME_FIELD = "email"
                "password": password,
            }
        )

        # Include email in response
        data["email"] = user.email
        data["username"] = user.username
        return data
