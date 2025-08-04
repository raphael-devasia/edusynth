#!/bin/bash

# Create comprehensive folder structure for Smart School Management System React Frontend

# Components structure
mkdir -p src/components/common
mkdir -p src/components/forms
mkdir -p src/components/tables
mkdir -p src/components/modals
mkdir -p src/components/charts

# Features structure (Redux slices and components for each module)
mkdir -p src/features/auth
mkdir -p src/features/dashboard
mkdir -p src/features/students
mkdir -p src/features/classes
mkdir -p src/features/sections
mkdir -p src/features/sessions
mkdir -p src/features/fees
mkdir -p src/features/library
mkdir -p src/features/staff
mkdir -p src/features/inventory
mkdir -p src/features/exams
mkdir -p src/features/attendance
mkdir -p src/features/transport
mkdir -p src/features/hostel
mkdir -p src/features/payroll
mkdir -p src/features/reports
mkdir -p src/features/settings
mkdir -p src/features/notifications
mkdir -p src/features/chat
mkdir -p src/features/certificates
mkdir -p src/features/homework
mkdir -p src/features/timetable
mkdir -p src/features/subjects
mkdir -p src/features/admissions
mkdir -p src/features/alumni
mkdir -p src/features/expenses
mkdir -p src/features/income
mkdir -p src/features/frontoffice

# Core structure
mkdir -p src/store
mkdir -p src/services
mkdir -p src/utils
mkdir -p src/types
mkdir -p src/hooks
mkdir -p src/layouts
mkdir -p src/pages
mkdir -p src/constants
mkdir -p src/assets/images
mkdir -p src/assets/icons

echo "Folder structure created successfully!"
