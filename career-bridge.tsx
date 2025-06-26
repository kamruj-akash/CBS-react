"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Upload,
  CreditCard,
  Clock,
  CheckCircle,
  Search,
  Building,
  Bell,
  User,
  ArrowRight,
  ArrowLeft,
  AlertTriangle,
  Phone,
  Mail,
  Calendar,
  Settings,
  LogOut,
  UserCircle,
  HelpCircle,
  X,
  Edit,
  Shield,
  Palette,
  MessageSquare,
  FileText,
  BookOpen,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const scaleOnHover = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
}

export default function Component() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [applicationId, setApplicationId] = useState("")
  const [searchedApplication, setSearchedApplication] = useState(null)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    industry: "",
    experience: "",
  })
  const [documents, setDocuments] = useState([
    { name: "Resume", uploaded: true },
    { name: "ID", uploaded: false },
    { name: "Previous Certificate", uploaded: false },
    { name: "Transcript", uploaded: false },
    { name: "Work Experience", uploaded: false },
  ])

  const notificationRef = useRef(null)

  const calculateProgress = () => {
    const uploadedCount = documents.filter((doc) => doc.uploaded).length
    return Math.round((uploadedCount / documents.length) * 100)
  }

  const uploadProgress = calculateProgress()
  const allDocumentsUploaded = uploadProgress === 100

  const [selectedPayment, setSelectedPayment] = useState("card")

  const applicationSteps = [
    { name: "Submitted", status: "completed", icon: CheckCircle },
    { name: "In Review", status: "current", icon: Clock },
    { name: "Documents Verified", status: "pending", icon: Search },
    { name: "Completed", status: "pending", icon: Building },
  ]

  const qualifications = [
    { code: "BSB40215", title: "Certificate IV in Business" },
    { code: "BSB50215", title: "Diploma of Business" },
    { code: "BSB60215", title: "Advanced Diploma of Management" },
  ]

  const notifications = [
    {
      id: 1,
      title: "Application Status Update",
      message: "Your application is now in review stage",
      time: "2 hours ago",
      type: "info",
      read: false,
    },
    {
      id: 2,
      title: "Document Upload Required",
      message: "Please upload your ID document to continue",
      time: "1 day ago",
      type: "warning",
      read: false,
    },
    {
      id: 3,
      title: "Payment Reminder",
      message: "Your payment is due in 3 days",
      time: "2 days ago",
      type: "alert",
      read: true,
    },
    {
      id: 4,
      title: "RTO Alert",
      message: "7000+ qualifications cancelled – check yours now!",
      time: "3 days ago",
      type: "alert",
      read: false,
    },
    {
      id: 5,
      title: "Welcome to Career Bridge",
      message: "Complete your profile to get started",
      time: "1 week ago",
      type: "info",
      read: true,
    },
  ]

  const unreadCount = notifications.filter((n) => !n.read).length

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "Upload Documents":
        setActiveTab("documents")
        break
      case "Pay Now":
        setActiveTab("payment")
        break
      case "Check Eligibility":
        setActiveTab("experience")
        break
      case "Track Application":
        setActiveTab("track")
        break
    }
  }

  const handleUserMenuClick = (action: string) => {
    switch (action) {
      case "Profile":
        setActiveTab("profile")
        break
      case "Settings":
        setActiveTab("settings")
        break
      case "Help & Support":
        setActiveTab("help-support")
        break
      case "Log out":
        // Handle logout logic here
        console.log("Logging out...")
        break
    }
  }

  const handleDocumentUpload = (docName: string) => {
    setDocuments((prev) => prev.map((doc) => (doc.name === docName ? { ...doc, uploaded: true } : doc)))
  }

  const handleApplicationSearch = () => {
    if (applicationId.trim()) {
      // Simulate application search - in real app this would be an API call
      setSearchedApplication({
        id: applicationId,
        applicantName: "Sarah Johnson",
        submittedDate: "2024-01-15",
        currentStep: 1, // 0: Submitted, 1: In Review, 2: Documents Verified, 3: Completed
        estimatedCompletion: "2024-02-15",
      })
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setShowSuccessDialog(true)
    // Reset form after submission
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        industry: "",
        experience: "",
      })
    }, 2000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const goBack = () => {
    setActiveTab("dashboard")
  }

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />
      case "alert":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Bell className="h-4 w-4 text-blue-500" />
    }
  }

  const getNotificationBg = (type: string, read: boolean) => {
    if (read) return "bg-gray-50"
    switch (type) {
      case "warning":
        return "bg-orange-50 border-l-4 border-orange-400"
      case "alert":
        return "bg-red-50 border-l-4 border-red-400"
      default:
        return "bg-blue-50 border-l-4 border-blue-400"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <motion.header
        className="bg-white shadow-sm border-b"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div className="flex items-center space-x-3" whileHover={{ scale: 1.05 }}>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CB</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Career Bridge
              </span>
            </motion.div>

            <div className="flex items-center space-x-4">
              {/* Notification Icon */}
              <div className="relative" ref={notificationRef}>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative"
                    onClick={() => setShowNotifications(!showNotifications)}
                  >
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </Button>
                </motion.div>

                {/* Notifications Popup */}
                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border z-50 max-h-96 overflow-hidden"
                    >
                      <div className="p-4 border-b bg-gray-50">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900">Notifications</h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowNotifications(false)}
                            className="h-6 w-6 p-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        {unreadCount > 0 && (
                          <p className="text-sm text-gray-600 mt-1">{unreadCount} unread notifications</p>
                        )}
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {notifications.map((notification, index) => (
                          <motion.div
                            key={notification.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${getNotificationBg(
                              notification.type,
                              notification.read,
                            )}`}
                          >
                            <div className="flex items-start space-x-3">
                              {getNotificationIcon(notification.type)}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <h4
                                    className={`text-sm font-medium ${
                                      notification.read ? "text-gray-600" : "text-gray-900"
                                    }`}
                                  >
                                    {notification.title}
                                  </h4>
                                  {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                                </div>
                                <p className={`text-sm mt-1 ${notification.read ? "text-gray-500" : "text-gray-700"}`}>
                                  {notification.message}
                                </p>
                                <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      <div className="p-3 border-t bg-gray-50">
                        <Button variant="ghost" size="sm" className="w-full text-blue-600 hover:text-blue-700">
                          View All Notifications
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button variant="ghost" size="icon" className="relative">
                      <User className="h-5 w-5" />
                    </Button>
                  </motion.div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">Sarah Johnson</p>
                      <p className="text-xs leading-none text-muted-foreground">sarah.johnson@email.com</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer" onClick={() => handleUserMenuClick("Profile")}>
                    <UserCircle className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => handleUserMenuClick("Settings")}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => handleUserMenuClick("Help & Support")}>
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>Help & Support</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer text-red-600 focus:text-red-600"
                    onClick={() => handleUserMenuClick("Log out")}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {activeTab === "dashboard" && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Welcome Section */}
              <motion.div {...fadeInUp}>
                <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <CardHeader>
                    <CardTitle className="text-2xl">Welcome back, Sarah</CardTitle>
                    <CardDescription className="text-blue-100">
                      Track your application progress and manage your career journey
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>

              {/* Application Status */}
              <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
                <Card>
                  <CardHeader>
                    <CardTitle>Application Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {applicationSteps.map((step, index) => {
                        const Icon = step.icon
                        return (
                          <motion.div
                            key={step.name}
                            className="flex items-center space-x-4"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <div
                              className={`p-2 rounded-full ${
                                step.status === "completed"
                                  ? "bg-green-100 text-green-600"
                                  : step.status === "current"
                                    ? "bg-blue-100 text-blue-600"
                                    : "bg-gray-100 text-gray-400"
                              }`}
                            >
                              <Icon className="h-5 w-5" />
                            </div>
                            <span
                              className={`font-medium ${
                                step.status === "completed"
                                  ? "text-green-600"
                                  : step.status === "current"
                                    ? "text-blue-600"
                                    : "text-gray-400"
                              }`}
                            >
                              {step.name}
                            </span>
                          </motion.div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Quick Actions */}
              <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { title: "Check Eligibility", icon: CheckCircle, color: "orange" },
                    { title: "Upload Documents", icon: Upload, color: "purple" },
                    { title: "Pay Now", icon: CreditCard, color: "green" },
                    { title: "Track Application", icon: Search, color: "blue" },
                  ].map((action, index) => (
                    <motion.div
                      key={action.title}
                      {...scaleOnHover}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      onClick={() => handleQuickAction(action.title)}
                    >
                      <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                        <CardContent className="p-6 text-center">
                          <div
                            className={`w-12 h-12 mx-auto mb-4 rounded-full bg-${action.color}-100 flex items-center justify-center`}
                          >
                            <action.icon className={`h-6 w-6 text-${action.color}-600`} />
                          </div>
                          <h3 className="font-medium">{action.title}</h3>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Recent Notifications */}
              <motion.div {...fadeInUp} transition={{ delay: 0.4 }}>
                <Card className="border-orange-200 bg-orange-50">
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-5 w-5 text-orange-600" />
                      <CardTitle className="text-orange-800">Recent Notifications</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <Badge variant="destructive">RTO Alert</Badge>
                        <div>
                          <h4 className="font-medium text-orange-800">
                            7000+ qualifications cancelled – check yours now!
                          </h4>
                          <p className="text-sm text-orange-600 mt-1">
                            Due to recent regulatory changes, several qualifications have been cancelled. Please verify
                            the status of your qualifications.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          )}

          {activeTab === "profile" && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Back Button */}
              <motion.div {...fadeInUp}>
                <Button variant="ghost" onClick={goBack} className="mb-4">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Button>
              </motion.div>

              {/* Profile Header */}
              <motion.div {...fadeInUp}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <UserCircle className="h-6 w-6" />
                      <span>Profile</span>
                    </CardTitle>
                    <CardDescription>Manage your personal information and account details</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>

              {/* Personal Information */}
              <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue="Sarah" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue="Johnson" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="sarah.johnson@email.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Textarea id="address" placeholder="Enter your address" />
                    </div>
                    <Button className="w-full md:w-auto">
                      <Edit className="mr-2 h-4 w-4" />
                      Update Profile
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Account Information */}
              <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
                <Card>
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>View your account details and status</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Account ID</Label>
                        <p className="text-lg font-semibold">CB-2024-001234</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Member Since</Label>
                        <p className="text-lg font-semibold">January 2024</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Account Status</Label>
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          Active
                        </Badge>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Verification Status</Label>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                          Verified
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          )}

          {activeTab === "settings" && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Back Button */}
              <motion.div {...fadeInUp}>
                <Button variant="ghost" onClick={goBack} className="mb-4">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Button>
              </motion.div>

              {/* Settings Header */}
              <motion.div {...fadeInUp}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Settings className="h-6 w-6" />
                      <span>Settings</span>
                    </CardTitle>
                    <CardDescription>Manage your account preferences and security settings</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>

              {/* Notification Settings */}
              <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>Choose how you want to receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-gray-500">Receive updates via email</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>SMS Notifications</Label>
                        <p className="text-sm text-gray-500">Receive updates via SMS</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Application Updates</Label>
                        <p className="text-sm text-gray-500">Get notified about application status changes</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Marketing Communications</Label>
                        <p className="text-sm text-gray-500">Receive promotional emails and offers</p>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Security Settings */}
              <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="h-5 w-5" />
                      <span>Security</span>
                    </CardTitle>
                    <CardDescription>Manage your account security</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Change Password</Label>
                      <Button variant="outline" className="w-full md:w-auto">
                        Update Password
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <Label>Two-Factor Authentication</Label>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="bg-red-100 text-red-700">
                          Disabled
                        </Badge>
                        <Button variant="outline" size="sm">
                          Enable 2FA
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Preferences */}
              <motion.div {...fadeInUp} transition={{ delay: 0.3 }}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Palette className="h-5 w-5" />
                      <span>Preferences</span>
                    </CardTitle>
                    <CardDescription>Customize your experience</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select defaultValue="utc">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="utc">UTC</SelectItem>
                          <SelectItem value="est">Eastern Time</SelectItem>
                          <SelectItem value="pst">Pacific Time</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          )}

          {activeTab === "help-support" && (
            <motion.div
              key="help-support"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Back Button */}
              <motion.div {...fadeInUp}>
                <Button variant="ghost" onClick={goBack} className="mb-4">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Button>
              </motion.div>

              {/* Help & Support Header */}
              <motion.div {...fadeInUp}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <HelpCircle className="h-6 w-6" />
                      <span>Help & Support</span>
                    </CardTitle>
                    <CardDescription>Get help and find answers to your questions</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>

              {/* Quick Help Options */}
              <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      title: "Contact Support",
                      description: "Get in touch with our support team",
                      icon: MessageSquare,
                      color: "blue",
                    },
                    {
                      title: "Documentation",
                      description: "Browse our comprehensive guides",
                      icon: FileText,
                      color: "green",
                    },
                    {
                      title: "FAQ",
                      description: "Find answers to common questions",
                      icon: BookOpen,
                      color: "purple",
                    },
                  ].map((option, index) => (
                    <motion.div
                      key={option.title}
                      {...scaleOnHover}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                        <CardContent className="p-6 text-center">
                          <div
                            className={`w-12 h-12 mx-auto mb-4 rounded-full bg-${option.color}-100 flex items-center justify-center`}
                          >
                            <option.icon className={`h-6 w-6 text-${option.color}-600`} />
                          </div>
                          <h3 className="font-medium mb-2">{option.title}</h3>
                          <p className="text-sm text-gray-600">{option.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Contact Information */}
              <motion.div {...fadeInUp} transition={{ delay: 0.3 }}>
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>Reach out to us through any of these channels</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium">Phone Support</p>
                          <p className="text-sm text-gray-600">+1 (800) 123-4567</p>
                          <p className="text-xs text-gray-500">Mon-Fri, 9AM-6PM EST</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-medium">Email Support</p>
                          <p className="text-sm text-gray-600">support@careerbridge.com</p>
                          <p className="text-xs text-gray-500">Response within 24 hours</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* FAQ Section */}
              <motion.div {...fadeInUp} transition={{ delay: 0.4 }}>
                <Card>
                  <CardHeader>
                    <CardTitle>Frequently Asked Questions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      {
                        question: "How long does the application process take?",
                        answer:
                          "The typical application process takes 5-10 business days from submission to completion.",
                      },
                      {
                        question: "What documents do I need to upload?",
                        answer:
                          "You'll need to upload your resume, ID, previous certificates, transcripts, and work experience documents.",
                      },
                      {
                        question: "Can I track my application status?",
                        answer:
                          "Yes, you can track your application status in real-time using your application ID on the Track Application page.",
                      },
                      {
                        question: "What payment methods are accepted?",
                        answer: "We accept credit cards, Afterpay, and EduPay for your convenience.",
                      },
                    ].map((faq, index) => (
                      <div key={index} className="border-b pb-4 last:border-b-0">
                        <h4 className="font-medium mb-2">{faq.question}</h4>
                        <p className="text-sm text-gray-600">{faq.answer}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          )}

          {activeTab === "track" && (
            <motion.div
              key="track"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Back Button */}
              <motion.div {...fadeInUp}>
                <Button variant="ghost" onClick={goBack} className="mb-4">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Button>
              </motion.div>

              {/* Search Section */}
              <motion.div {...fadeInUp}>
                <Card>
                  <CardHeader>
                    <CardTitle>Track Your Application</CardTitle>
                    <CardDescription>
                      Enter your application ID to check the current status of your application
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex space-x-2">
                      <div className="flex-1">
                        <Label htmlFor="applicationId" className="sr-only">
                          Application ID
                        </Label>
                        <input
                          id="applicationId"
                          type="text"
                          placeholder="Enter your application ID (e.g., CB-2024-001234)"
                          value={applicationId}
                          onChange={(e) => setApplicationId(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          onKeyPress={(e) => e.key === "Enter" && handleApplicationSearch()}
                        />
                      </div>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button onClick={handleApplicationSearch} disabled={!applicationId.trim()}>
                          <Search className="mr-2 h-4 w-4" />
                          Search
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Application Status Results */}
              {searchedApplication && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  {/* Application Info */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Application Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-500">Application ID</Label>
                          <p className="text-lg font-semibold">{searchedApplication.id}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-500">Applicant Name</Label>
                          <p className="text-lg font-semibold">{searchedApplication.applicantName}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-500">Submitted Date</Label>
                          <p className="text-lg font-semibold">{searchedApplication.submittedDate}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-500">Estimated Completion</Label>
                          <p className="text-lg font-semibold">{searchedApplication.estimatedCompletion}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Application Status Timeline */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Application Status</CardTitle>
                      <CardDescription>Track the progress of your application through each stage</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {applicationSteps.map((step, index) => {
                          const Icon = step.icon
                          const isCompleted = index <= searchedApplication.currentStep
                          const isCurrent = index === searchedApplication.currentStep

                          return (
                            <motion.div
                              key={step.name}
                              className="flex items-center space-x-4"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.2 }}
                            >
                              <div className="flex flex-col items-center">
                                <div
                                  className={`p-3 rounded-full transition-colors ${
                                    isCompleted
                                      ? "bg-green-100 text-green-600"
                                      : isCurrent
                                        ? "bg-blue-100 text-blue-600 ring-4 ring-blue-50"
                                        : "bg-gray-100 text-gray-400"
                                  }`}
                                >
                                  <Icon className="h-6 w-6" />
                                </div>
                                {index < applicationSteps.length - 1 && (
                                  <div className={`w-0.5 h-12 mt-2 ${isCompleted ? "bg-green-300" : "bg-gray-200"}`} />
                                )}
                              </div>
                              <div className="flex-1">
                                <h3
                                  className={`font-semibold text-lg ${
                                    isCompleted ? "text-green-600" : isCurrent ? "text-blue-600" : "text-gray-400"
                                  }`}
                                >
                                  {step.name}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">
                                  {isCompleted && index < searchedApplication.currentStep
                                    ? "Completed"
                                    : isCurrent
                                      ? "Currently in progress"
                                      : "Pending"}
                                </p>
                                {isCurrent && (
                                  <motion.div
                                    className="mt-2"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                  >
                                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                                      In Progress
                                    </Badge>
                                  </motion.div>
                                )}
                              </div>
                            </motion.div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Next Steps */}
                  <Card className="bg-blue-50 border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-blue-800">What's Next?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {searchedApplication.currentStep === 0 && (
                          <p className="text-blue-700">
                            Your application is currently being reviewed by our team. We'll notify you once it moves to
                            the next stage.
                          </p>
                        )}
                        {searchedApplication.currentStep === 1 && (
                          <p className="text-blue-700">
                            We're reviewing your application and documents. This process typically takes 3-5 business
                            days.
                          </p>
                        )}
                        {searchedApplication.currentStep === 2 && (
                          <p className="text-blue-700">
                            Your documents have been verified! We're now processing your final application approval.
                          </p>
                        )}
                        {searchedApplication.currentStep === 3 && (
                          <p className="text-green-700">
                            Congratulations! Your application has been completed successfully.
                          </p>
                        )}
                        <div className="flex space-x-2 mt-4">
                          <Button variant="outline" size="sm">
                            <Mail className="mr-2 h-4 w-4" />
                            Email Updates
                          </Button>
                          <Button variant="outline" size="sm">
                            <Phone className="mr-2 h-4 w-4" />
                            Contact Support
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </motion.div>
          )}

          {activeTab === "documents" && (
            <motion.div
              key="documents"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Back Button */}
              <motion.div {...fadeInUp}>
                <Button variant="ghost" onClick={goBack} className="mb-4">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Button>
              </motion.div>

              <motion.div {...fadeInUp}>
                <Card>
                  <CardHeader>
                    <CardTitle>Upload Documents</CardTitle>
                    <CardDescription>Complete your application by uploading the required documents</CardDescription>
                    <div className="flex items-center space-x-2">
                      <Progress value={uploadProgress} className="flex-1" />
                      <span className="text-sm font-medium">{uploadProgress}% complete</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <motion.div className="grid gap-4" variants={staggerChildren} initial="initial" animate="animate">
                      {documents.map((doc, index) => (
                        <motion.div
                          key={doc.name}
                          variants={fadeInUp}
                          {...scaleOnHover}
                          className={`p-4 border-2 border-dashed rounded-lg transition-colors ${
                            doc.uploaded
                              ? "border-green-300 bg-green-50"
                              : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className={`p-2 rounded-full ${doc.uploaded ? "bg-green-100" : "bg-gray-100"}`}>
                                {doc.uploaded ? (
                                  <CheckCircle className="h-5 w-5 text-green-600" />
                                ) : (
                                  <Upload className="h-5 w-5 text-gray-400" />
                                )}
                              </div>
                              <div>
                                <h3 className="font-medium">{doc.name}</h3>
                                <p className="text-sm text-gray-500">
                                  {doc.uploaded ? "Uploaded successfully" : `Upload ${doc.name}`}
                                </p>
                              </div>
                            </div>
                            {!doc.uploaded && (
                              <Button variant="outline" size="sm" onClick={() => handleDocumentUpload(doc.name)}>
                                Choose File
                              </Button>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
              {allDocumentsUploaded && (
                <motion.div
                  className="mt-6 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                      onClick={() => setActiveTab("payment")}
                    >
                      Next - Proceed to Payment
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          )}

          {activeTab === "payment" && (
            <motion.div
              key="payment"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Back Button */}
              <motion.div {...fadeInUp}>
                <Button variant="ghost" onClick={() => setActiveTab("documents")} className="mb-4">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Upload Documents
                </Button>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-6">
                <motion.div {...fadeInUp}>
                  <Card>
                    <CardHeader>
                      <CardTitle>Payment</CardTitle>
                      <CardDescription>Choose your payment method</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                        <h3 className="text-2xl font-bold text-gray-900">$1,200.00</h3>
                        <p className="text-gray-600">Total Payment</p>
                      </div>

                      <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment}>
                        <motion.div
                          className="space-y-3"
                          variants={staggerChildren}
                          initial="initial"
                          animate="animate"
                        >
                          {[
                            { id: "card", label: "Pay in Full (Card)", description: "Pay the full amount now" },
                            {
                              id: "afterpay",
                              label: "Buy Now, Pay Later (Afterpay)",
                              description: "Split into 4 payments",
                            },
                            { id: "edupay", label: "EduPay", description: "Educational payment plan" },
                          ].map((option) => (
                            <motion.div
                              key={option.id}
                              variants={fadeInUp}
                              {...scaleOnHover}
                              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                                selectedPayment === option.id
                                  ? "border-blue-500 bg-blue-50"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <div className="flex items-center space-x-3">
                                <RadioGroupItem value={option.id} id={option.id} />
                                <div>
                                  <Label htmlFor={option.id} className="font-medium cursor-pointer">
                                    {option.label}
                                  </Label>
                                  <p className="text-sm text-gray-500">{option.description}</p>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </motion.div>
                      </RadioGroup>

                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                          Continue
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </motion.div>

                      <div className="text-center text-sm text-green-600 font-medium">
                        No Interest, No Hidden Charges
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
                  <Card>
                    <CardHeader>
                      <CardTitle>Payment History</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <div>
                              <h4 className="font-medium">Payment 1</h4>
                              <p className="text-sm text-gray-500">Completed</p>
                            </div>
                          </div>
                          <span className="font-bold">$1,200.00</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          )}

          {activeTab === "experience" && (
            <motion.div
              key="experience"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Back Button */}
              <motion.div {...fadeInUp}>
                <Button variant="ghost" onClick={goBack} className="mb-4">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Button>
              </motion.div>

              <motion.div {...fadeInUp}>
                <Card>
                  <CardHeader>
                    <CardTitle>Industry Experience</CardTitle>
                    <CardDescription>
                      Tell us about your professional background to find the best qualifications for you
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleFormSubmit} className="space-y-6">
                      {/* Contact Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            placeholder="Enter your full name"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            placeholder="Enter your email address"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="Enter your phone number"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="industry">What industry do you have experience in? *</Label>
                        <Select
                          value={formData.industry}
                          onValueChange={(value) => handleInputChange("industry", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select an industry" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="business">Business</SelectItem>
                            <SelectItem value="healthcare">Healthcare</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                            <SelectItem value="technology">Technology</SelectItem>
                            <SelectItem value="hospitality">Hospitality</SelectItem>
                            <SelectItem value="construction">Construction</SelectItem>
                            <SelectItem value="finance">Finance</SelectItem>
                            <SelectItem value="retail">Retail</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="experience">Tell us about your experience *</Label>
                        <Textarea
                          id="experience"
                          value={formData.experience}
                          onChange={(e) => handleInputChange("experience", e.target.value)}
                          placeholder="Describe your work experience, skills, and achievements..."
                          className="min-h-[120px]"
                          required
                        />
                      </div>

                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        >
                          Submit Application
                        </Button>
                      </motion.div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
                <Card>
                  <CardHeader>
                    <CardTitle>Possible RPL Qualifications</CardTitle>
                    <CardDescription>
                      Based on your experience, these qualifications might be suitable for Recognition of Prior Learning
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <motion.div className="space-y-4" variants={staggerChildren} initial="initial" animate="animate">
                      {qualifications.map((qual, index) => (
                        <motion.div
                          key={qual.code}
                          variants={fadeInUp}
                          {...scaleOnHover}
                          className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">{qual.code}</h3>
                              <p className="text-sm text-gray-600">{qual.title}</p>
                            </div>
                            <Button variant="outline" size="sm">
                              <ArrowRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>

                    <Separator className="my-6" />

                    <motion.div className="text-center" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                        <Calendar className="mr-2 h-4 w-4" />
                        Book free assessment call
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Support Section */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-gray-50">
            <CardContent className="p-6 text-center">
              <h3 className="font-medium mb-2">Need Help?</h3>
              <p className="text-sm text-gray-600 mb-4">
                If your application status is stuck or you have any questions, please contact our support team for
                assistance.
              </p>
              <div className="flex justify-center space-x-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="sm">
                    <Phone className="mr-2 h-4 w-4" />
                    Call Support
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="sm">
                    <Mail className="mr-2 h-4 w-4" />
                    Email Support
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <DialogTitle className="text-center">Thank You!</DialogTitle>
            <DialogDescription className="text-center">
              Thank you for your inquiry! We will get back to you soon.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-4">
            <Button onClick={() => setShowSuccessDialog(false)} className="w-full">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
