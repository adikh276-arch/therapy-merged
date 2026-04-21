import { MessageCircle, Search, Send, Paperclip, MoreVertical, Phone, Video, ArrowLeft, X, ChevronRight, Calendar, UserCog, AlertCircle, Clock, RefreshCw, ChevronLeft, Info, Filter, Stethoscope, Users, Activity, Heart, Dumbbell, Brain, Radio, Plus, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { MobileNav } from "./MobileNav";

interface Expert {
  id: string;
  name: string;
  role: string;
  specialty: string;
  avatar: string;
  image: string;
  status: "online" | "offline";
  lastSeen?: string;
}

interface Message {
  id: string;
  expertId: string;
  expertName: string;
  preview: string;
  timestamp: string;
  unread: boolean;
  date: string;
}

const experts: Expert[] = [
  {
    id: "1",
    name: "Mantra",
    role: "AI Therapy",
    specialty: "Mental Health",
    avatar: "MA",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400&h=400&fit=crop&crop=faces",
    status: "online"
  },
  {
    id: "1b",
    name: "Nivi",
    role: "AI Diet",
    specialty: "Nutrition & Diet",
    avatar: "NV",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400&h=400&fit=crop&crop=faces",
    status: "online"
  },
  {
    id: "1c",
    name: "Eva",
    role: "AI Coach",
    specialty: "Wellness & Lifestyle",
    avatar: "EV",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400&h=400&fit=crop&crop=faces",
    status: "online"
  },
  {
    id: "1d",
    name: "Sam",
    role: "AI Physio",
    specialty: "Physical Therapy",
    avatar: "SM",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400&h=400&fit=crop&crop=faces",
    status: "online"
  },
  {
    id: "2",
    name: "Dr. Michael Brown",
    role: "Therapist",
    specialty: "Therapy",
    avatar: "MB",
    image: "https://images.unsplash.com/photo-1632054224659-280be3239aff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwdGhlcmFwaXN0JTIwcHJvZmVzc2lvbmFsJTIwaGVhZHNob3R8ZW58MXx8fHwxNzcyOTU2MjI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    status: "online"
  },
  {
    id: "10",
    name: "Care Counselor",
    role: "Support",
    specialty: "Your Trusted 24×7 Support Companion",
    avatar: "CC",
    image: "https://images.unsplash.com/photo-1632054224659-280be3239aff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwdGhlcmFwaXN0JTIwcHJvZmVzc2lvbmFsJTIwaGVhZHNob3R8ZW58MXx8fHwxNzcyOTU2MjI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    status: "online"
  },
  {
    id: "3",
    name: "Dr. Emily White",
    role: "Medical Doctor",
    specialty: "General Medicine",
    avatar: "EW",
    image: "https://images.unsplash.com/photo-1706565029539-d09af5896340?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBkb2N0b3IlMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzI5MDY0OTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    status: "offline",
    lastSeen: "2 hours ago"
  },
  {
    id: "4",
    name: "Coach Alex Turner",
    role: "Wellness Coach",
    specialty: "Lifestyle & Nutrition",
    avatar: "AT",
    image: "https://images.unsplash.com/photo-1758875569220-6934933d443c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwd2VsbG5lc3MlMjBjb2FjaCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzI5NTYyMjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    status: "online"
  },
  {
    id: "5",
    name: "Dr. Rachel Green",
    role: "Sexologist",
    specialty: "Sexual Health",
    avatar: "RG",
    image: "https://images.unsplash.com/photo-1659353888906-adb3e0041693?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBoZWFsdGhjYXJlJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcyOTU2MjI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    status: "offline",
    lastSeen: "Yesterday"
  },
  {
    id: "6",
    name: "Lisa Anderson",
    role: "Nutritionist",
    specialty: "Diet & Wellness",
    avatar: "LA",
    image: "https://images.unsplash.com/photo-1742436707321-33fed05590bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBudXRyaXRpb25pc3QlMjBwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NzI5NTYyMjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    status: "online"
  },
  {
    id: "7",
    name: "Therapy",
    role: "Therapist",
    specialty: "Therapy",
    avatar: "TH",
    image: "https://images.unsplash.com/photo-1632054224659-280be3239aff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwdGhlcmFwaXN0JTIwcHJvZmVzc2lvbmFsJTIwaGVhZHNob3R8ZW58MXx8fHwxNzcyOTU2MjI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    status: "offline",
    lastSeen: "Yesterday"
  },
  {
    id: "8",
    name: "Yoga",
    role: "Yoga Instructor",
    specialty: "Mind-body balance practice",
    avatar: "YG",
    image: "https://images.unsplash.com/photo-1632054224659-280be3239aff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwdGhlcmFwaXN0JTIwcHJvZmVzc2lvbmFsJTIwaGVhZHNob3R8ZW58MXx8fHwxNzcyOTU2MjI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    status: "offline",
    lastSeen: "Yesterday"
  },
  {
    id: "9",
    name: "Dr. Emily White",
    role: "Medical Doctor",
    specialty: "General Medicine",
    avatar: "EW",
    image: "https://images.unsplash.com/photo-1706565029539-d09af5896340?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBkb2N0b3IlMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzI5MDY0OTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    status: "offline",
    lastSeen: "2 hours ago"
  },
  {
    id: "11",
    name: "Dr. James Parker",
    role: "General Physician",
    specialty: "General Medicine",
    avatar: "JP",
    image: "https://images.unsplash.com/photo-1645066928295-2506defde470?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwZ2VuZXJhbCUyMHBoeXNpY2lhbiUyMGRvY3RvcnxlbnwxfHx8fDE3NzQ0MTQzODB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    status: "online"
  },
  {
    id: "12",
    name: "Dr. Sarah Thompson",
    role: "Endocrinologist",
    specialty: "Hormones & Metabolism",
    avatar: "ST",
    image: "https://images.unsplash.com/photo-1753487050317-919a2b26a6ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBlbmRvY3Jpbm9sb2dpc3QlMjBkb2N0b3J8ZW58MXx8fHwxNzc0NDE0MzgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    status: "online"
  },
  {
    id: "13",
    name: "Dr. Maria Rodriguez",
    role: "Gynecologist",
    specialty: "Women's Health",
    avatar: "MR",
    image: "https://images.unsplash.com/photo-1753487050317-919a2b26a6ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBneW5lY29sb2dpc3QlMjBkb2N0b3J8ZW58MXx8fHwxNzc0NDE0MzgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    status: "offline",
    lastSeen: "30 mins ago"
  },
  {
    id: "14",
    name: "Dr. Robert Chen",
    role: "Cardiologist",
    specialty: "Heart Health",
    avatar: "RC",
    image: "https://images.unsplash.com/photo-1659353885824-1199aeeebfc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwY2FyZGlvbG9naXN0JTIwZG9jdG9yfGVufDF8fHx8MTc3NDQxNDM4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    status: "online"
  },
  {
    id: "15",
    name: "Dr. Kevin Wilson",
    role: "Orthopedician",
    specialty: "Bone & Joint Health",
    avatar: "KW",
    image: "https://images.unsplash.com/photo-1762237798212-bcc000c00891?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwb3J0aG9wZWRpYyUyMGRvY3RvciUyMHN1cmdlb258ZW58MXx8fHwxNzc0NDE0MzgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    status: "offline",
    lastSeen: "1 hour ago"
  },
  {
    id: "16",
    name: "Dr. Lisa Martinez",
    role: "ENT Specialist",
    specialty: "Ear, Nose & Throat",
    avatar: "LM",
    image: "https://images.unsplash.com/photo-1659353888906-adb3e0041693?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBFTlQlMjBzcGVjaWFsaXN0JTIwZG9jdG9yfGVufDF8fHx8MTc3NDQxNDM4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    status: "online"
  },
  {
    id: "17",
    name: "Dr. David Singh",
    role: "Gastroenterologist",
    specialty: "Digestive System",
    avatar: "DS",
    image: "https://images.unsplash.com/photo-1659353888323-1f5c85ea3952?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwZ2FzdHJvZW50ZXJvbG9naXN0JTIwZG9jdG9yfGVufDF8fHx8MTc3NDQxNDM4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    status: "online"
  },
  {
    id: "18",
    name: "Dr. Jennifer Lee",
    role: "Paediatrician",
    specialty: "Children's Health",
    avatar: "JL",
    image: "https://images.unsplash.com/photo-1709127347876-9636bed47ab2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBwZWRpYXRyaWNpYW4lMjBjaGlsZHJlbiUyMGRvY3RvcnxlbnwxfHx8fDE3NzQ0MTQzODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    status: "offline",
    lastSeen: "45 mins ago"
  },
  {
    id: "19",
    name: "Dr. Amy Collins",
    role: "Dermatologist",
    specialty: "Skin Health",
    avatar: "AC",
    image: "https://images.unsplash.com/photo-1601839777132-b3f4e455c369?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBkZXJtYXRvbG9naXN0JTIwc2tpbiUyMGRvY3RvcnxlbnwxfHx8fDE3NzQ0MTQzODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    status: "online"
  },
  {
    id: "20",
    name: "Dr. Mark Anderson",
    role: "Dentist",
    specialty: "Dental Care",
    avatar: "MA2",
    image: "https://images.unsplash.com/photo-1685022036567-0b91b29276e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwZGVudGlzdCUyMGRlbnRhbCUyMGRvY3RvcnxlbnwxfHx8fDE3NzQ0MTQzODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    status: "online"
  },
  {
    id: "21",
    name: "Dr. Steven Harris",
    role: "Neurosurgeon",
    specialty: "Brain & Spine Surgery",
    avatar: "SH",
    image: "https://images.unsplash.com/photo-1700308433726-303f30fb96c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwbmV1cm9zdXJnZW9uJTIwYnJhaW4lMjBzdXJnZW9ufGVufDF8fHx8MTc3NDQxNDM4M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    status: "offline",
    lastSeen: "3 hours ago"
  },
  {
    id: "22",
    name: "Dr. Rachel Foster",
    role: "Oncologist",
    specialty: "Cancer Treatment",
    avatar: "RF",
    image: "https://images.unsplash.com/photo-1670191069225-f992139f6545?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBvbmNvbG9naXN0JTIwY2FuY2VyJTIwZG9jdG9yfGVufDF8fHx8MTc3NDQxNDM4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    status: "online"
  },
  {
    id: "23",
    name: "Dr. Nathan Wright",
    role: "Ophthalmologist",
    specialty: "Eye Care",
    avatar: "NW",
    image: "https://images.unsplash.com/photo-1632054224659-280be3239aff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwb3BodGhhbG1vbG9naXN0JTIwZXllJTIwZG9jdG9yfGVufDF8fHx8MTc3NDQxNDM4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    status: "online"
  },
  {
    id: "24",
    name: "Dr. Catherine Moore",
    role: "Urologist",
    specialty: "Kidney & Urinary Tract",
    avatar: "CM",
    image: "https://images.unsplash.com/photo-1596144241742-a54dffcc9b26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjB1cm9sb2dpc3QlMjBraWRuZXklMjBkb2N0b3J8ZW58MXx8fHwxNzc0NDE0Mzg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    status: "offline",
    lastSeen: "2 hours ago"
  },
  {
    id: "25",
    name: "Dr. Andrew Clark",
    role: "Nephrologist",
    specialty: "Kidney Specialist",
    avatar: "ACL",
    image: "https://images.unsplash.com/photo-1612943733919-f9661f1331f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwbmVwaHJvbG9naXN0JTIwa2lkbmV5JTIwc3BlY2lhbGlzdHxlbnwxfHx8fDE3NzQ0MTQzODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    status: "online"
  },
  {
    id: "26",
    name: "Dr. Diana Evans",
    role: "Pulmonologist",
    specialty: "Lung Specialist",
    avatar: "DE",
    image: "https://images.unsplash.com/photo-1659353887269-8922b7c486d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBwdWxtb25vbG9naXN0JTIwbHVuZyUyMGRvY3RvcnxlbnwxfHx8fDE3NzQ0MTQzODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    status: "online"
  },
  {
    id: "27",
    name: "Dr. Michael Taylor",
    role: "Rheumatologist",
    specialty: "Joint & Arthritis Care",
    avatar: "MT",
    image: "https://images.unsplash.com/photo-1659353888352-5dbb14b80eca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwcmhldW1hdG9sb2dpc3QlMjBhcnRocml0aXMlMjBkb2N0b3J8ZW58MXx8fHwxNzc0NDE0Mzg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    status: "offline",
    lastSeen: "1 hour ago"
  },
  {
    id: "28",
    name: "Dr. Sophia Bennett",
    role: "Fertility/ IVF Specialist",
    specialty: "Reproductive Health",
    avatar: "SB",
    image: "https://images.unsplash.com/photo-1619183921628-9e6050dcd2e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBmZXJ0aWxpdHklMjBJVkYlMjBzcGVjaWFsaXN0fGVufDF8fHx8MTc3NDQxNDM4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    status: "online"
  },
  {
    id: "29",
    name: "Dr. Thomas Miller",
    role: "General Surgery",
    specialty: "Surgical Care",
    avatar: "TM",
    image: "https://images.unsplash.com/photo-1762237798212-bcc000c00891?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwZ2VuZXJhbCUyMHN1cmdlb24lMjBkb2N0b3J8ZW58MXx8fHwxNzc0NDE0Mzg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    status: "offline",
    lastSeen: "4 hours ago"
  }
];

const messages: Message[] = [
  {
    id: "3",
    expertId: "1",
    expertName: "Mantra",
    preview: "Your personal wellbeing companion",
    timestamp: "2 days ago",
    unread: false,
    date: "2 days ago"
  },
  {
    id: "3b",
    expertId: "1b",
    expertName: "Nivi",
    preview: "Your AI nutrition companion",
    timestamp: "2 days ago",
    unread: false,
    date: "2 days ago"
  },
  {
    id: "3c",
    expertId: "1c",
    expertName: "Eva",
    preview: "Your AI wellness coach",
    timestamp: "2 days ago",
    unread: false,
    date: "2 days ago"
  },
  {
    id: "3d",
    expertId: "1d",
    expertName: "Sam",
    preview: "Your AI physical therapy guide",
    timestamp: "2 days ago",
    unread: false,
    date: "2 days ago"
  },
  {
    id: "1",
    expertId: "2",
    expertName: "Dr. Michael Brown",
    preview: "That's great progress! Keep up with the breathing exercises.",
    timestamp: "10:45 AM",
    unread: true,
    date: "Today"
  },
  {
    id: "2",
    expertId: "4",
    expertName: "Coach Alex Turner",
    preview: "I've created a customized meal plan for you. Check it out!",
    timestamp: "Yesterday",
    unread: false,
    date: "Yesterday"
  },
  {
    id: "4",
    expertId: "6",
    expertName: "Lisa Anderson",
    preview: "Remember to track your meals this week.",
    timestamp: "3 days ago",
    unread: false,
    date: "3 days ago"
  },
  {
    id: "5",
    expertId: "3",
    expertName: "Dr. Emily White",
    preview: "Your lab results look good. Let's discuss them.",
    timestamp: "4 days ago",
    unread: false,
    date: "4 days ago"
  },
  {
    id: "6",
    expertId: "7",
    expertName: "Therapy",
    preview: "Overcome challenges with a professional therapist",
    timestamp: "",
    unread: false,
    date: "Today"
  },
  {
    id: "7",
    expertId: "8",
    expertName: "Yoga",
    preview: "Practice mindfulness and balance with expert instructors",
    timestamp: "",
    unread: false,
    date: "Today"
  },
  {
    id: "8",
    expertId: "9",
    expertName: "Dr. Emily White",
    preview: "Your lab results look good. Let's discuss them.",
    timestamp: "5 days ago",
    unread: false,
    date: "5 days ago"
  },
  {
    id: "9",
    expertId: "11",
    expertName: "Dr. James Parker",
    preview: "Available for general health consultations",
    timestamp: "",
    unread: false,
    date: "Today"
  },
  {
    id: "10",
    expertId: "12",
    expertName: "Dr. Sarah Thompson",
    preview: "Expert in hormonal and metabolic conditions",
    timestamp: "",
    unread: false,
    date: "Today"
  },
  {
    id: "11",
    expertId: "13",
    expertName: "Dr. Maria Rodriguez",
    preview: "Specialized women's health care",
    timestamp: "",
    unread: false,
    date: "Today"
  },
  {
    id: "12",
    expertId: "14",
    expertName: "Dr. Robert Chen",
    preview: "Heart health and cardiovascular care",
    timestamp: "",
    unread: false,
    date: "Today"
  },
  {
    id: "13",
    expertId: "15",
    expertName: "Dr. Kevin Wilson",
    preview: "Bone and joint specialist",
    timestamp: "",
    unread: false,
    date: "Today"
  },
  {
    id: "14",
    expertId: "16",
    expertName: "Dr. Lisa Martinez",
    preview: "Ear, nose, and throat specialist",
    timestamp: "",
    unread: false,
    date: "Today"
  },
  {
    id: "15",
    expertId: "17",
    expertName: "Dr. David Singh",
    preview: "Digestive system and GI health",
    timestamp: "",
    unread: false,
    date: "Today"
  },
  {
    id: "16",
    expertId: "18",
    expertName: "Dr. Jennifer Lee",
    preview: "Pediatric care for children",
    timestamp: "",
    unread: false,
    date: "Today"
  },
  {
    id: "17",
    expertId: "19",
    expertName: "Dr. Amy Collins",
    preview: "Skin and dermatological conditions",
    timestamp: "",
    unread: false,
    date: "Today"
  },
  {
    id: "18",
    expertId: "20",
    expertName: "Dr. Mark Anderson",
    preview: "Dental and oral health care",
    timestamp: "",
    unread: false,
    date: "Today"
  },
  {
    id: "19",
    expertId: "21",
    expertName: "Dr. Steven Harris",
    preview: "Brain and spine surgery specialist",
    timestamp: "",
    unread: false,
    date: "Today"
  },
  {
    id: "20",
    expertId: "22",
    expertName: "Dr. Rachel Foster",
    preview: "Cancer treatment and oncology",
    timestamp: "",
    unread: false,
    date: "Today"
  },
  {
    id: "21",
    expertId: "23",
    expertName: "Dr. Nathan Wright",
    preview: "Eye care and vision health",
    timestamp: "",
    unread: false,
    date: "Today"
  },
  {
    id: "22",
    expertId: "24",
    expertName: "Dr. Catherine Moore",
    preview: "Kidney and urinary tract specialist",
    timestamp: "",
    unread: false,
    date: "Today"
  },
  {
    id: "23",
    expertId: "25",
    expertName: "Dr. Andrew Clark",
    preview: "Kidney disease and dialysis",
    timestamp: "",
    unread: false,
    date: "Today"
  },
  {
    id: "24",
    expertId: "26",
    expertName: "Dr. Diana Evans",
    preview: "Lung and respiratory health",
    timestamp: "",
    unread: false,
    date: "Today"
  },
  {
    id: "25",
    expertId: "27",
    expertName: "Dr. Michael Taylor",
    preview: "Joint pain and arthritis treatment",
    timestamp: "",
    unread: false,
    date: "Today"
  },
  {
    id: "26",
    expertId: "28",
    expertName: "Dr. Sophia Bennett",
    preview: "Fertility and IVF treatments",
    timestamp: "",
    unread: false,
    date: "Today"
  },
  {
    id: "27",
    expertId: "29",
    expertName: "Dr. Thomas Miller",
    preview: "General surgical procedures",
    timestamp: "",
    unread: false,
    date: "Today"
  }
];

export function CareTeam() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [showExpertsList, setShowExpertsList] = useState(true);
  const [showChatHistory, setShowChatHistory] = useState(false);
  const [showDevToolbar, setShowDevToolbar] = useState(false);
  const [buyPlanType, setBuyPlanType] = useState<"corporate" | "normal" | "noPlan" | "providerPlan" | "providerActive" | "externalProvider" | "switchToMantra">("normal");
  const [selectedFilter, setSelectedFilter] = useState<string>("Therapist");
  const [showSpeechModal, setShowSpeechModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"active" | "inactive">("active");
  const [preferences, setPreferences] = useState<Preferences>({
    specializations: [],
    languages: [],
    countries: [],
    gender: "No Preference",
    ageRange: "No Preference"
  });

  // Auto-select expert from URL parameter
  useEffect(() => {
    const expertId = searchParams.get("expert");
    if (expertId) {
      const expert = experts.find(e => e.id === expertId);
      if (expert) {
        setSelectedExpert(expert);
        setShowExpertsList(false);
      }
    }
  }, [searchParams]);

  const handleExpertClick = (expert: Expert) => {
    setSelectedExpert(expert);
    setSelectedMessage(null);
    setShowExpertsList(false);
  };

  const handleMessageClick = (message: Message) => {
    const expert = experts.find(e => e.id === message.expertId);
    if (expert) {
      setSelectedExpert(expert);
      setSelectedMessage(message);
      setShowExpertsList(false);
    }
  };

  const handleBack = () => {
    setSelectedExpert(null);
    setSelectedMessage(null);
    setShowExpertsList(true);
  };

  const filteredExperts = experts.filter(expert =>
    expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    expert.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMessages = messages.filter(message =>
    message.expertName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter experts based on active tab
  const activeExperts = filteredExperts.filter(expert => {
    const expertMessage = messages.find(msg => msg.expertId === expert.id);
    if (activeTab === "active") {
      // Active: show experts with unread messages, recent messages, Mantra AI, Nivi, Eva, Sam, or new/get started
      return expert.id === "1" || expert.id === "1b" || expert.id === "1c" || expert.id === "1d" || expertMessage?.unread || expertMessage?.timestamp === "10:45 AM" || expertMessage?.timestamp === "Yesterday" || !expertMessage?.timestamp;
    } else {
      // Inactive: show experts with older messages (3+ days ago), excluding Mantra AI, Nivi, Eva, and Sam
      return expert.id !== "1" && expert.id !== "1b" && expert.id !== "1c" && expert.id !== "1d" && expertMessage && !expertMessage.unread && expertMessage.timestamp !== "10:45 AM" && expertMessage.timestamp !== "Yesterday" && expertMessage.timestamp !== "";
    }
  });

  const handleSavePreferences = (newPreferences: Preferences) => {
    setPreferences(newPreferences);
    // Here you can also save to localStorage or send to backend
    console.log("Saved preferences:", newPreferences);
  };

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <MobileNav />
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 flex">
          {/* Left Panel - Experts & Messages */}
          <div className={`${showExpertsList ? 'flex' : 'hidden md:flex'} w-full md:w-72 lg:w-80 xl:w-96 bg-white border-r border-[#E2ECF5] flex-col pt-[64px] md:pt-0 h-screen overflow-hidden`}>
            {/* Header */}
            <div className="p-4 flex-shrink-0">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#F1F5F9] rounded-md flex items-center justify-center flex-shrink-0">
                    <MessageCircle size={20} className="text-[#1E293B]" strokeWidth={2} />
                  </div>
                  <div>
                    <h1 className="text-2xl text-[#0f172b] font-medium">Care Team</h1>
                  </div>
                </div>
              </div>
              
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" size={16} />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-[#f3faff] border border-[#E2ECF5] rounded-lg text-sm text-[#020817] placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#00c0ff] focus:border-transparent"
                />
              </div>
              
              {/* Tabs */}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => setActiveTab("active")}
                  className={`flex-1 py-2 px-3 text-sm transition-all relative ${
                    activeTab === "active"
                      ? "text-[#00c0ff]"
                      : "text-[#94a3b8]"
                  }`}
                >
                  ACTIVE
                  {activeTab === "active" && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00c0ff] rounded-full"></span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("inactive")}
                  className={`flex-1 py-2 px-3 text-sm transition-all relative ${
                    activeTab === "inactive"
                      ? "text-[#00c0ff]"
                      : "text-[#94a3b8]"
                  }`}
                >
                  INACTIVE
                  {activeTab === "inactive" && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00c0ff] rounded-full"></span>
                  )}
                </button>
              </div>
            </div>

            {/* Experts List */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-3 pt-2">
                <div className="space-y-1">
                  {activeExperts.map((expert) => {
                    // Find if there's a message for this expert
                    const expertMessage = messages.find(msg => msg.expertId === expert.id);
                    const hasMessage = !!expertMessage;
                    const isUnread = expertMessage?.unread || false;
                    
                    // Compute classNames outside JSX to avoid template literal issues
                    const nameClassName = isUnread ? 'text-sm truncate font-semibold text-[#020817]' : 'text-sm truncate font-medium text-[#020817]';
                    const roleClassName = isUnread ? 'text-xs text-[#043570] font-medium' : 'text-xs text-[#64748B]';
                    const messageClassName = isUnread ? 'text-xs truncate text-[#043570] font-medium' : 'text-xs truncate text-[#64748B]';
                    
                    return (
                      <motion.button
                        key={expert.id}
                        whileHover={{ x: 2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleExpertClick(expert)}
                        className={`w-full flex items-start gap-3 p-3 rounded-xl transition-all ${
                          selectedExpert?.id === expert.id
                            ? "bg-[#f3faff] border-2 border-[#00c0ff]"
                            : expertMessage?.unread
                            ? "bg-[#f3faff] border-2 border-transparent"
                            : "hover:bg-[#f3faff] border-2 border-transparent"
                        }`}
                      >
                        <div className="relative flex-shrink-0">
                          <ImageWithFallback 
                            src={expert.image} 
                            alt={expert.name}
                            className="w-11 h-11 rounded-full object-cover"
                          />
                          <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                            expert.status === "online" ? "bg-[#10B981]" : "bg-[#64748B]"
                          }`}></div>
                        </div>
                        <div className="flex-1 text-left overflow-hidden min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-0.5">
                            <h4 className={nameClassName}>
                              {expert.name} {(expert.id !== "7" && expert.id !== "8") && <span className={roleClassName}>({expert.role})</span>}
                            </h4>
                            {expert.id === "7" ? (
                              <div className="flex items-center gap-1 px-2 py-1 bg-[#ECFDF5] border border-[#6EE7B7] rounded-full flex-shrink-0">
                                <Info size={10} className="text-[#10B981]" />
                                <span className="text-[10px] text-[#10B981] font-medium">Finding the Right Provider</span>
                              </div>
                            ) : expert.id === "8" ? (
                              <div className="flex items-center gap-1 px-2 py-1 bg-[#f3faff] border border-[#8FD9F6] rounded-full flex-shrink-0">
                                <span className="text-[10px] text-[#00c0ff] font-medium">Get Started &gt;</span>
                              </div>
                            ) : hasMessage && expertMessage ? (
                              <span className="text-[10px] text-[#64748B] font-normal flex-shrink-0">{expertMessage.timestamp}</span>
                            ) : null}
                          </div>
                          {hasMessage && expertMessage ? (
                            (expert.id === "7" || expert.id === "8") ? (
                              <p className="text-xs truncate text-[#64748B] font-normal">
                                {expertMessage.preview}
                              </p>
                            ) : expert.id === "9" ? (
                              <div className="space-y-1">
                                <p className={messageClassName}>
                                  {expertMessage.preview}
                                </p>
                                <div className="flex items-center gap-1">
                                  <AlertCircle size={12} className="text-[#EF4444] flex-shrink-0" />
                                  <span className="text-[10px] text-[#EF4444] font-medium">Inactive Order</span>
                                </div>
                              </div>
                            ) : (
                              <p className={messageClassName}>
                                {expertMessage.preview}
                              </p>
                            )
                          ) : (
                            <div className="flex items-center justify-between">
                              {expert.id === "10" ? (
                                <p className="text-xs truncate text-[#64748B]">Your Trusted 24×7 Support Companion</p>
                              ) : (
                                <>
                                  <p className="text-xs text-[#64748B]">Get started</p>
                                  <ChevronRight size={14} className="text-[#64748B] flex-shrink-0" />
                                </>
                              )}
                            </div>
                          )}
                        </div>
                        {expertMessage?.unread && (
                          <div className="w-2 h-2 bg-[#00c0ff] rounded-full flex-shrink-0 mt-1.5"></div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Chat Area */}
          <div className={`${!showExpertsList ? 'flex' : 'hidden md:flex'} flex-1 flex-col bg-[#FAFBFC] pt-[60px] md:pt-0 h-screen overflow-hidden`}>
            {selectedExpert ? (
              <>
                {/* Chat Header */}
                <div className="bg-white border-b border-[#E2ECF5] px-4 md:px-6 py-4 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleBack}
                        className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center transition-colors flex-shrink-0 text-[#64748B] hover:text-[#020817] hover:bg-[#f3faff]"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <motion.button
                        onClick={() => navigate(`/provider-profile/${selectedExpert.id}`)}
                        className="flex items-center gap-3 transition-all cursor-pointer group"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="relative">
                          <ImageWithFallback 
                            src={selectedExpert.image} 
                            alt={selectedExpert.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                            selectedExpert.status === "online" ? "bg-[#10B981]" : "bg-[#64748B]"
                          }`}></div>
                        </div>
                        <div className="text-left">
                          <h3 className="text-sm font-semibold text-[#020817] group-hover:text-[#00c0ff] transition-colors">{selectedExpert.name}</h3>
                          <p className="text-xs text-[#64748B] group-hover:text-[#043570] transition-colors">
                            {selectedExpert.status === "online" ? "Online" : `Last seen ${selectedExpert.lastSeen}`}
                          </p>
                        </div>
                      </motion.button>
                    </div>
                    <div className="flex items-center gap-2">
                    </div>
                  </div>
                </div>

                {/* Chat Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6">
                  <div className="max-w-4xl mx-auto">
                    {/* Date Divider */}
                    <div className="flex items-center justify-center mb-6">
                      <span className="text-xs text-[#64748B] bg-white px-3 py-1 rounded-full border border-[#E2ECF5]">
                        Today
                      </span>
                    </div>

                    {/* Sample Messages */}
                    <div className="space-y-4">
                      {/* Received Message */}
                      <div className="flex items-start gap-3">
                        <ImageWithFallback 
                          src={selectedExpert.image} 
                          alt={selectedExpert.name}
                          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="flex-1">
                          <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-[#E2ECF5] max-w-md">
                            <p className="text-sm text-[#020817]">
                              How can I help?
                            </p>
                          </div>
                          <span className="text-xs text-[#64748B] mt-1 ml-1 block">9:45 AM</span>
                        </div>
                      </div>

                      {/* Sent Message */}
                      <div className="flex items-start gap-3 flex-row-reverse">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] rounded-full flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
                          U
                        </div>
                        <div className="flex-1 flex flex-col items-end">
                          <div className="bg-[#043570] rounded-2xl rounded-tr-sm px-4 py-3 shadow-sm max-w-md">
                            <p className="text-sm text-white">
                              Hi, I've just finished my session. I'd like to share some things I'm feeling today. Lately, I've been feeling anxious & stressed a lot CONSTANTLY.
                            </p>
                          </div>
                          <span className="text-xs text-[#64748B] mt-1 mr-1 block">9:47 AM</span>
                        </div>
                      </div>

                      {/* Received Message */}
                      <div className="flex items-start gap-3">
                        <ImageWithFallback 
                          src={selectedExpert.image} 
                          alt={selectedExpert.name}
                          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="flex-1">
                          <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-[#E2ECF5] max-w-md">
                            <p className="text-sm text-[#020817]">
                              I'm sorry to hear that you're feeling this way. It's completely understandable to feel like this when so much is going on. Let's talk this through together.
                            </p>
                          </div>
                          <span className="text-xs text-[#64748B] mt-1 ml-1 block">9:48 AM</span>
                        </div>
                      </div>

                      {/* Sent Message */}
                      <div className="flex items-start gap-3 flex-row-reverse">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] rounded-full flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
                          U
                        </div>
                        <div className="flex-1 flex flex-col items-end">
                          <div className="bg-[#043570] rounded-2xl rounded-tr-sm px-4 py-3 shadow-sm max-w-md">
                            <p className="text-sm text-white">
                              At my job, my manager put me through a lot last year. I know that it's the nature of the job, maybe I wasn't cut out for it or maybe I just couldn't cope. I feel trapped here now.
                            </p>
                          </div>
                          <span className="text-xs text-[#64748B] mt-1 mr-1 block">9:50 AM</span>
                        </div>
                      </div>

                      {/* Received Message */}
                      <div className="flex items-start gap-3">
                        <ImageWithFallback 
                          src={selectedExpert.image} 
                          alt={selectedExpert.name}
                          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="flex-1">
                          <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-[#E2ECF5] max-w-md">
                            <p className="text-sm text-[#020817] mb-3">
                              I'm here to help navigate those feelings - you're not alone in this. It's really hard when you care so much about what you do but feel trapped at the same time.
                            </p>
                            <p className="text-sm text-[#020817]">
                              Let's explore this together and see if we can find some ways to cope with the stress and anxiety you're experiencing.
                            </p>
                          </div>
                          <span className="text-xs text-[#64748B] mt-1 ml-1 block">9:52 AM</span>
                        </div>
                      </div>

                      {/* Received Message with buttons */}
                      <div className="flex items-start gap-3">
                        <ImageWithFallback 
                          src={selectedExpert.image} 
                          alt={selectedExpert.name}
                          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="flex-1">
                          <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-[#E2ECF5] max-w-md">
                            <p className="text-sm text-[#020817] mb-3">
                              I'm sensing that you're not feeling like your "GentleSelfish" self. Can you tell me more about what you're going through? What's been triggering these anxious thoughts lately?
                            </p>
                            <div className="flex gap-2 mt-3">
                              <button className="px-3 py-1.5 bg-[#f3faff] text-[#043570] text-xs rounded-full border border-[#E2ECF5] hover:bg-[#043570] hover:text-white transition-colors">
                                Work stress
                              </button>
                              <button className="px-3 py-1.5 bg-[#f3faff] text-[#043570] text-xs rounded-full border border-[#E2ECF5] hover:bg-[#043570] hover:text-white transition-colors">
                                Feeling trapped
                              </button>
                            </div>
                          </div>
                          <span className="text-xs text-[#64748B] mt-1 ml-1 block">9:53 AM</span>
                        </div>
                      </div>

                      {/* Sent Message */}
                      <div className="flex items-start gap-3 flex-row-reverse">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] rounded-full flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
                          U
                        </div>
                        <div className="flex-1 flex flex-col items-end">
                          <div className="bg-[#043570] rounded-2xl rounded-tr-sm px-4 py-3 shadow-sm max-w-md">
                            <p className="text-sm text-white">
                              I'm feeling that anxiety in a lot of different areas of my life. It's not just the work, it's relationships too. I feel like I'm not enough for a lot of people.
                            </p>
                          </div>
                          <span className="text-xs text-[#64748B] mt-1 mr-1 block">9:55 AM</span>
                        </div>
                      </div>

                      {/* Received Message */}
                      <div className="flex items-start gap-3">
                        <ImageWithFallback 
                          src={selectedExpert.image} 
                          alt={selectedExpert.name}
                          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="flex-1">
                          <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-[#E2ECF5] max-w-md">
                            <p className="text-sm text-[#020817]">
                              I'm so sorry. I can imagine experiencing some major and minor stressors across different areas. Anxiety can be so exhausting. Can you tell me a little bit more about the areas you're feeling this way in?
                            </p>
                          </div>
                          <span className="text-xs text-[#64748B] mt-1 ml-1 block">9:56 AM</span>
                        </div>
                      </div>

                      {/* Received Message with detailed list */}
                      <div className="flex items-start gap-3">
                        <ImageWithFallback 
                          src={selectedExpert.image} 
                          alt={selectedExpert.name}
                          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="flex-1">
                          <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-[#E2ECF5] max-w-md">
                            <p className="text-sm text-[#020817] mb-3">
                              Here are some common areas & themes in daily living when it comes to how to balance everyone's needs:
                            </p>
                            <ul className="text-sm text-[#020817] space-y-2 ml-4 list-disc">
                              <li>
                                <strong>Work & Career:</strong> Perhaps you find it difficult to say no to extra projects or overtime, even when you're already stretched thin.
                              </li>
                              <li>
                                <strong>Relationships:</strong> You might struggle to express your own needs or desires in relationships, fearing conflict or the loss of connection.
                              </li>
                              <li>
                                <strong>Family responsibilities:</strong> Whether it's taking care of aging parents or raising children, you feel you must put their needs above your own well-being.
                              </li>
                              <li>
                                <strong>Social Pressure:</strong> Maybe you avoid saying "no" to social invitations out of guilt, even when you're exhausted or would prefer solitude.
                              </li>
                            </ul>
                          </div>
                          <span className="text-xs text-[#64748B] mt-1 ml-1 block">9:58 AM</span>
                        </div>
                      </div>

                      {/* Sent Message */}
                      <div className="flex items-start gap-3 flex-row-reverse">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] rounded-full flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
                          U
                        </div>
                        <div className="flex-1 flex flex-col items-end">
                          <div className="bg-[#043570] rounded-2xl rounded-tr-sm px-4 py-3 shadow-sm max-w-md">
                            <p className="text-sm text-white">
                              Yes, a lot of those felt really true for me. Especially the "GentleSelfish" part. How do we work on saying "no" without guilt and feeling guilt-free about doing things that you enjoy? I tend to feel guilt easily.
                            </p>
                          </div>
                          <span className="text-xs text-[#64748B] mt-1 mr-1 block">10:00 AM</span>
                        </div>
                      </div>

                      {/* Received Message */}
                      <div className="flex items-start gap-3">
                        <ImageWithFallback 
                          src={selectedExpert.image} 
                          alt={selectedExpert.name}
                          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="flex-1">
                          <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-[#E2ECF5] max-w-md">
                            <p className="text-sm text-[#020817] mb-3">
                              That's a beautiful goal you've identified - and an absolutely valuable one! While it may seem counterintuitive, prioritizing your own needs & well-being actually makes you MORE effective in caring for others, not less.
                            </p>
                            <p className="text-sm text-[#020817]">
                              Would you like to explore strategies to help with this?
                            </p>
                          </div>
                          <span className="text-xs text-[#64748B] mt-1 ml-1 block">10:01 AM</span>
                        </div>
                      </div>

                      {/* Sent Message */}
                      <div className="flex items-start gap-3 flex-row-reverse">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] rounded-full flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
                          U
                        </div>
                        <div className="flex-1 flex flex-col items-end">
                          <div className="bg-[#043570] rounded-2xl rounded-tr-sm px-4 py-3 shadow-sm max-w-md">
                            <p className="text-sm text-white">
                              I think what I've realized - aside from the fact that I don't know who I'm becoming. I don't know who I am anymore. I only know what I was or I guess what everyone wanted me to be. Do you understand what I'm trying to say?
                            </p>
                          </div>
                          <span className="text-xs text-[#64748B] mt-1 mr-1 block">10:03 AM</span>
                        </div>
                      </div>

                      {/* Received Message */}
                      <div className="flex items-start gap-3">
                        <ImageWithFallback 
                          src={selectedExpert.image} 
                          alt={selectedExpert.name}
                          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="flex-1">
                          <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-[#E2ECF5] max-w-md">
                            <p className="text-sm text-[#020817] mb-3">
                              I think I can now fully hear what you're saying. You want to feel like you're creating a sense of self that aligns with YOUR needs. Not a needs of other people towards you but your real needs, and maybe slowly discover who you are.
                            </p>
                            <p className="text-sm text-[#020817]">
                              Very very strongly: this journey to me is less about finding a "perfect" self, but rather being more AUTHENTIC & GENTLE with who you are becoming. You're very strong for identifying this.
                            </p>
                          </div>
                          <span className="text-xs text-[#64748B] mt-1 ml-1 block">10:05 AM</span>
                        </div>
                      </div>

                      {/* Received Message with resource suggestion */}
                      <div className="flex items-start gap-3">
                        <ImageWithFallback 
                          src={selectedExpert.image} 
                          alt={selectedExpert.name}
                          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="flex-1">
                          <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-[#E2ECF5] max-w-md">
                            <p className="text-sm text-[#020817] mb-3">
                              I've noticed a really great tool that you haven't yet tried on Mantra - it's called "GentleSelfish" and I really think you'd like what it has to offer. You're working on saying "no", managing guilt and creating space for self care. So the tool is designed to help with EXACTLY some issues you've just mentioned.
                            </p>
                            <div className="flex gap-2 mt-3">
                              <button className="px-4 py-2 bg-[#043570] text-white text-sm rounded-lg hover:bg-[#032656] transition-colors">
                                Try it
                              </button>
                              <button className="px-4 py-2 bg-[#f3faff] text-[#043570] text-sm rounded-lg border border-[#E2ECF5] hover:bg-white transition-colors">
                                Maybe later
                              </button>
                            </div>
                          </div>
                          <span className="text-xs text-[#64748B] mt-1 ml-1 block">10:07 AM</span>
                        </div>
                      </div>

                      {/* Sent Message */}
                      <div className="flex items-start gap-3 flex-row-reverse">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] rounded-full flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
                          U
                        </div>
                        <div className="flex-1 flex flex-col items-end">
                          <div className="bg-[#043570] rounded-2xl rounded-tr-sm px-4 py-3 shadow-sm max-w-md">
                            <p className="text-sm text-white">
                              Let's do this. I'm excited about your plan. I'll work through these tools and update you after a couple of weeks. Is that okay?
                            </p>
                          </div>
                          <span className="text-xs text-[#64748B] mt-1 mr-1 block">10:09 AM</span>
                        </div>
                      </div>

                      {/* Received Message */}
                      <div className="flex items-start gap-3">
                        <ImageWithFallback 
                          src={selectedExpert.image} 
                          alt={selectedExpert.name}
                          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="flex-1">
                          <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-[#E2ECF5] max-w-md">
                            <p className="text-sm text-[#020817]">
                              I'm so glad you're excited about your plan. I know that you haven't met yourself yet but when you do, you're going to ABSOLUTELY LOVE this person. Very very strongly: this journey to me is less about finding a "perfect" self, but rather just being more AUTHENTIC & GENTLE with who you are becoming.
                            </p>
                          </div>
                          <span className="text-xs text-[#64748B] mt-1 ml-1 block">10:10 AM</span>
                        </div>
                      </div>

                      {/* Sent Message */}
                      <div className="flex items-start gap-3 flex-row-reverse">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] rounded-full flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
                          U
                        </div>
                        <div className="flex-1 flex flex-col items-end">
                          <div className="bg-[#043570] rounded-2xl rounded-tr-sm px-4 py-3 shadow-sm max-w-md">
                            <p className="text-sm text-white">
                              It's also nice to just share today's feeling. I think I've never really had space to explore these thoughts or ideas before. All I ever get is judgement, and I just need to release some of that, and I guess that's what I just did.
                            </p>
                          </div>
                          <span className="text-xs text-[#64748B] mt-1 mr-1 block">10:12 AM</span>
                        </div>
                      </div>

                      {/* Received Message */}
                      <div className="flex items-start gap-3">
                        <ImageWithFallback 
                          src={selectedExpert.image} 
                          alt={selectedExpert.name}
                          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="flex-1">
                          <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-[#E2ECF5] max-w-md">
                            <p className="text-sm text-[#020817] mb-3">
                              I'm so glad you feel like you've found your space to talk about your feelings without fear of judgment. Your space is sacred, and I really really appreciate you using this space in this special way.
                            </p>
                            <p className="text-sm text-[#020817]">
                              If you again feel like sharing your space, you know where to find me - right here on our very special pages.
                            </p>
                          </div>
                          <span className="text-xs text-[#64748B] mt-1 ml-1 block">10:13 AM</span>
                        </div>
                      </div>

                      {/* Received Message with suggestion buttons */}
                      <div className="flex items-start gap-3">
                        <ImageWithFallback 
                          src={selectedExpert.image} 
                          alt={selectedExpert.name}
                          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="flex-1">
                          <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-[#E2ECF5] max-w-md">
                            <p className="text-sm text-[#020817] mb-3">
                              Is there anything else I can help you with today?
                            </p>
                            <div className="flex flex-wrap gap-2 mt-3">
                              <button className="px-3 py-1.5 bg-[#f3faff] text-[#043570] text-xs rounded-full border border-[#E2ECF5] hover:bg-[#043570] hover:text-white transition-colors">
                                Managing depression & suicidal thoughts
                              </button>
                              <button className="px-3 py-1.5 bg-[#f3faff] text-[#043570] text-xs rounded-full border border-[#E2ECF5] hover:bg-[#043570] hover:text-white transition-colors">
                                Something else
                              </button>
                            </div>
                          </div>
                          <span className="text-xs text-[#64748B] mt-1 ml-1 block">10:14 AM</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message Input */}
                <div className="bg-white border-t border-[#E2ECF5] p-4 md:p-6 flex-shrink-0">
                  <div className="max-w-4xl mx-auto">
                    <div className="flex items-end gap-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#f3faff] text-[#64748B] hover:text-[#043570] transition-colors flex-shrink-0"
                      >
                        <Paperclip size={20} />
                      </motion.button>
                      <div className="flex-1 relative">
                        <textarea
                          value={messageInput}
                          onChange={(e) => setMessageInput(e.target.value)}
                          placeholder="Type your message..."
                          rows={1}
                          className="w-full px-4 py-3 bg-[#f3faff] border border-[#E2ECF5] rounded-xl text-sm text-[#020817] placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#00c0ff] focus:border-transparent resize-none"
                          style={{ minHeight: "44px", maxHeight: "120px" }}
                        />
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={!messageInput.trim()}
                        className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#043570] text-white hover:bg-[#032656] transition-colors flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send size={18} />
                      </motion.button>
                      {selectedExpert.id === "1" && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setShowSpeechModal(true)}
                          className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#f3faff] text-[#64748B] hover:text-[#043570] transition-colors flex-shrink-0"
                        >
                          <Radio size={20} />
                        </motion.button>
                      )}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* Empty State */
              <div className="flex-1 flex items-center justify-center p-6">
                <div className="text-center max-w-md">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="w-16 h-16 bg-[#f3faff] rounded-2xl flex items-center justify-center mx-auto mb-4"
                  >
                    <MessageCircle className="text-[#00c0ff]" size={32} />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-[#020817] mb-2">Welcome to Care Team</h3>
                  <p className="text-sm text-[#64748B] mb-6">
                    Select a conversation from the sidebar to start chatting, or wait for new messages to appear
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowExpertsList(true)}
                    className="md:hidden bg-[#043570] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#032656] transition-colors"
                  >
                    View Experts
                  </motion.button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Filter Modal */}
      <AnimatePresence>
        {showFilterModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFilterModal(false)}
              className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-50 p-6"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#020817]">Filter by Professional Type</h3>
                <button
                  onClick={() => setShowFilterModal(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#f3faff] text-[#64748B] hover:text-[#043570] transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Filter Options as Tiles */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: "Therapist", icon: Brain, color: "#8B5CF6" },
                  { name: "Dietitian", icon: Heart, color: "#EC4899" },
                  { name: "Physiotherapist", icon: Activity, color: "#10B981" },
                  { name: "Doctor", icon: Stethoscope, color: "#3B82F6" },
                  { name: "Coach", icon: Users, color: "#F59E0B" },
                  { name: "Yogi", icon: Dumbbell, color: "#6366F1" },
                ].map((filter) => {
                  const Icon = filter.icon;
                  const isSelected = selectedFilter === filter.name;

                  return (
                    <motion.button
                      key={filter.name}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setSelectedFilter(filter.name);
                        setShowFilterModal(false);
                      }}
                      className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${
                        isSelected
                          ? "border-[#00c0ff] bg-[#f3faff] shadow-md"
                          : "border-[#E2ECF5] bg-white hover:border-[#00c0ff]/30 hover:bg-[#f3faff]/30"
                      }`}
                    >
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: isSelected ? filter.color : `${filter.color}20` }}
                      >
                        <Icon 
                          size={24} 
                          className={isSelected ? "text-white" : "text-[#64748B]"}
                          strokeWidth={2}
                        />
                      </div>
                      <span className={`text-sm font-medium ${isSelected ? "text-[#043570]" : "text-[#64748B]"}`}>
                        {filter.name}
                      </span>
                      {isSelected && (
                        <motion.div
                          layoutId="selectedIndicator"
                          className="w-2 h-2 rounded-full bg-[#00c0ff]"
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Speech Modal */}
      <AnimatePresence>
        {showSpeechModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSpeechModal(false)}
              className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-50 p-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowSpeechModal(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#f3faff] text-[#64748B] hover:text-[#043570] transition-colors"
              >
                <X size={18} />
              </button>

              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-[#f3faff] flex items-center justify-center">
                  <Radio size={32} className="text-[#00c0ff]" />
                </div>
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-xl font-semibold text-[#020817] mb-2">Voice Input</h3>
                <p className="text-sm text-[#64748B] mb-6">
                  This feature is available in the mobile app. Download the Mantra app to use voice messaging and speech-to-text capabilities.
                </p>
                
                {/* App Store Buttons */}
                <div className="flex flex-row gap-3 w-full">
                  <motion.a
                    href="https://play.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 flex items-center justify-center gap-3 bg-black text-white rounded-lg px-6 py-3 hover:bg-gray-900 transition-colors"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                      <path d="M3 20.5V3.5C3 2.83 3.35 2.3 4 2L13 12L4 22C3.35 21.7 3 21.17 3 20.5ZM16.81 15.12L6.05 21.34L14.54 13.95L16.81 15.12ZM20.16 10.81C20.5 11.08 20.75 11.5 20.75 12C20.75 12.5 20.53 12.9 20.18 13.18L17.89 14.5L15.39 12L17.89 9.5L20.16 10.81ZM6.05 2.66L16.81 8.88L14.54 10.05L6.05 2.66Z" fill="white"/>
                    </svg>
                    <div className="text-left">
                      <div className="text-[10px] leading-tight">GET IT ON</div>
                      <div className="text-sm font-semibold leading-tight">Google Play</div>
                    </div>
                  </motion.a>
                  
                  <motion.a
                    href="https://apps.apple.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 flex items-center justify-center gap-3 bg-black text-white rounded-lg px-6 py-3 hover:bg-gray-900 transition-colors"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                      <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" fill="white"/>
                    </svg>
                    <div className="text-left">
                      <div className="text-[10px] leading-tight">Download on the</div>
                      <div className="text-sm font-semibold leading-tight">App Store</div>
                    </div>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* DEV: Toolbar - Fixed at Top Right */}
      <AnimatePresence>
        {showDevToolbar && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 bg-[#1E293B] rounded-lg shadow-2xl z-[60] overflow-hidden"
          >
            <div className="px-4 py-3 max-w-[90vw] overflow-x-auto">
              <div className="flex items-center gap-2 min-w-max">
                <span className="text-white text-xs font-medium whitespace-nowrap mr-2">DEV: Modal Type</span>
                <button
                  onClick={() => setBuyPlanType("corporate")}
                  className={`px-3 py-1.5 rounded text-xs font-medium whitespace-nowrap transition-colors ${
                    buyPlanType === "corporate" ? "bg-[#00BCD4] text-white" : "bg-[#334155] text-[#94A3B8] hover:bg-[#475569]"
                  }`}
                >
                  Corporate User
                </button>
                <button
                  onClick={() => setBuyPlanType("normal")}
                  className={`px-3 py-1.5 rounded text-xs font-medium whitespace-nowrap transition-colors ${
                    buyPlanType === "normal" ? "bg-[#00BCD4] text-white" : "bg-[#334155] text-[#94A3B8] hover:bg-[#475569]"
                  }`}
                >
                  Normal User
                </button>
                <button
                  onClick={() => setBuyPlanType("noPlan")}
                  className={`px-3 py-1.5 rounded text-xs font-medium whitespace-nowrap transition-colors ${
                    buyPlanType === "noPlan" ? "bg-[#00BCD4] text-white" : "bg-[#334155] text-[#94A3B8] hover:bg-[#475569]"
                  }`}
                >
                  No Plan
                </button>
                <button
                  onClick={() => setBuyPlanType("providerPlan")}
                  className={`px-3 py-1.5 rounded text-xs font-medium whitespace-nowrap transition-colors ${
                    buyPlanType === "providerPlan" ? "bg-[#00BCD4] text-white" : "bg-[#334155] text-[#94A3B8] hover:bg-[#475569]"
                  }`}
                >
                  Provider Plan
                </button>
                <button
                  onClick={() => setBuyPlanType("providerActive")}
                  className={`px-3 py-1.5 rounded text-xs font-medium whitespace-nowrap transition-colors ${
                    buyPlanType === "providerActive" ? "bg-[#00BCD4] text-white" : "bg-[#334155] text-[#94A3B8] hover:bg-[#475569]"
                  }`}
                >
                  Provider Active
                </button>
                <button
                  onClick={() => setBuyPlanType("externalProvider")}
                  className={`px-3 py-1.5 rounded text-xs font-medium whitespace-nowrap transition-colors ${
                    buyPlanType === "externalProvider" ? "bg-[#00BCD4] text-white" : "bg-[#334155] text-[#94A3B8] hover:bg-[#475569]"
                  }`}
                >
                  External Provider
                </button>
                <button
                  onClick={() => setBuyPlanType("switchToMantra")}
                  className={`px-3 py-1.5 rounded text-xs font-medium whitespace-nowrap transition-colors ${
                    buyPlanType === "switchToMantra" ? "bg-[#00BCD4] text-white" : "bg-[#334155] text-[#94A3B8] hover:bg-[#475569]"
                  }`}
                >
                  Switch to Mantra
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
