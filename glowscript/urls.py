from django.contrib import admin
from django.urls import path
from shop.views import home, wishlist, cart
from django.conf import settings
from django.conf.urls.static import static
import os


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home, name='home'),
    path('wishlist/', wishlist, name='wishlist'),
    path('cart/', cart, name='cart'),
]

if settings.DEBUG is False:
     urlpatterns += static(settings.STATIC_URL, document_root=os.path.join(settings.BASE_DIR, 'static'))
