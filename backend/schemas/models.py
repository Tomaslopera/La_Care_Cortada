from pydantic import BaseModel
from typing import Optional
from datetime import datetime, date


class User(BaseModel):
    first_name: str
    last_name: str
    email: str
    password: Optional[str] = None


class Membership(BaseModel):
    name: str
    description: str
    price: str


class UserMembership(BaseModel):
    id: Optional[int] = None
    user_id: int
    membership_id: int
    start_date: date
    end_date: Optional[date] = None


class Product(BaseModel):
    name: str
    description: str
    price: float
    image: str
    category: str


class Photo(BaseModel):
    title: str
    description: str
    digital_price: float
    physical_price: float
    categories: str
    tags: str
    available_formats: str
    photographer: str


class Model(BaseModel):
    name: str
    photos: str
    portfolio: str
    booking_info: str


class Event(BaseModel):
    name: str
    date: date
    location: str
    models: list[str]
    products: list[str]


class Cart(BaseModel):
    id: Optional[int] = None
    user_id: int


class CartItem(BaseModel):
    id: Optional[int] = None
    cart_id: int
    product_id: int
    quantity: int
