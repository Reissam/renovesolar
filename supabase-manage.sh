#!/bin/bash

# Supabase Management Scripts for Renove Solar

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="renove-solar-website"
BACKUP_DIR="./supabase/backups"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

echo -e "${GREEN}🗄️  Supabase Management Scripts${NC}"
echo "=================================="

# Function to backup leads
backup_leads() {
    echo -e "${YELLOW}📦 Creating backup of leads table...${NC}"
    
    # Check if .env.local exists
    if [ ! -f ".env.local" ]; then
        echo -e "${RED}❌ .env.local file not found! Please create it first.${NC}"
        exit 1
    fi
    
    # Load environment variables
    source .env.local
    
    # Create backup using psql (requires supabase CLI)
    if command -v supabase &> /dev/null; then
        supabase db dump --db-url "postgresql://postgres:$SUPABASE_DB_PASSWORD@db.$SUPABASE_PROJECT_ID.supabase.co:5432/postgres" --data-only --table=leads > "$BACKUP_DIR/leads_backup_$DATE.sql"
        echo -e "${GREEN}✅ Backup created: leads_backup_$DATE.sql${NC}"
    else
        echo -e "${YELLOW}⚠️  Supabase CLI not found. Please install it first:${NC}"
        echo "npm install -g supabase"
        echo "Then run: supabase login"
    fi
}

# Function to restore leads
restore_leads() {
    echo -e "${YELLOW}📥 Restoring leads table...${NC}"
    
    if [ -z "$1" ]; then
        echo -e "${RED}❌ Please provide backup file name${NC}"
        echo "Usage: ./supabase-manage.sh restore leads_backup_20240101_120000.sql"
        exit 1
    fi
    
    BACKUP_FILE="$BACKUP_DIR/$1"
    
    if [ ! -f "$BACKUP_FILE" ]; then
        echo -e "${RED}❌ Backup file not found: $BACKUP_FILE${NC}"
        exit 1
    fi
    
    # Load environment variables
    source .env.local
    
    # Restore from backup
    supabase db reset --db-url "postgresql://postgres:$SUPABASE_DB_PASSWORD@db.$SUPABASE_PROJECT_ID.supabase.co:5432/postgres" --file="$BACKUP_FILE"
    echo -e "${GREEN}✅ Leads restored from $1${NC}"
}

# Function to export leads to CSV
export_csv() {
    echo -e "${YELLOW}📊 Exporting leads to CSV...${NC}"
    
    if [ ! -f ".env.local" ]; then
        echo -e "${RED}❌ .env.local file not found!${NC}"
        exit 1
    fi
    
    source .env.local
    
    # Export to CSV using psql
    psql "postgresql://postgres:$SUPABASE_DB_PASSWORD@db.$SUPABASE_PROJECT_ID.supabase.co:5432/postgres" -c "\copy (SELECT id, name, email, phone, consumption, property_type, city, state, best_contact_time, lead_source, status, created_at FROM leads ORDER BY created_at DESC) to '$BACKUP_DIR/leads_export_$DATE.csv' with csv header"
    
    echo -e "${GREEN}✅ Leads exported: leads_export_$DATE.csv${NC}"
}

# Function to show leads count
show_stats() {
    echo -e "${YELLOW}📈 Database Statistics...${NC}"
    
    if [ ! -f ".env.local" ]; then
        echo -e "${RED}❌ .env.local file not found!${NC}"
        exit 1
    fi
    
    source .env.local
    
    # Get statistics
    TOTAL_LEADS=$(psql "postgresql://postgres:$SUPABASE_DB_PASSWORD@db.$SUPABASE_PROJECT_ID.supabase.co:5432/postgres" -t -c "SELECT COUNT(*) FROM leads;")
    NEW_LEADS=$(psql "postgresql://postgres:$SUPABASE_DB_PASSWORD@db.$SUPABASE_PROJECT_ID.supabase.co:5432/postgres" -t -c "SELECT COUNT(*) FROM leads WHERE status = 'new';")
    CONTACTED_LEADS=$(psql "postgresql://postgres:$SUPABASE_DB_PASSWORD@db.$SUPABASE_PROJECT_ID.supabase.co:5432/postgres" -t -c "SELECT COUNT(*) FROM leads WHERE status = 'contacted';")
    
    echo "=================================="
    echo "📊 Leads Statistics"
    echo "=================================="
    echo "Total Leads: $TOTAL_LEADS"
    echo "New Leads: $NEW_LEADS"
    echo "Contacted Leads: $CONTACTED_LEADS"
    echo "=================================="
}

# Function to list backups
list_backups() {
    echo -e "${YELLOW}📋 Available backups:${NC}"
    echo "=================================="
    
    if [ -d "$BACKUP_DIR" ]; then
        ls -la "$BACKUP_DIR"
    else
        echo "No backup directory found."
    fi
}

# Main script logic
case "$1" in
    "backup")
        backup_leads
        ;;
    "restore")
        restore_leads "$2"
        ;;
    "export")
        export_csv
        ;;
    "stats")
        show_stats
        ;;
    "list")
        list_backups
        ;;
    *)
        echo "Usage: $0 {backup|restore|export|stats|list}"
        echo ""
        echo "Commands:"
        echo "  backup     - Create backup of leads table"
        echo "  restore    - Restore leads from backup file"
        echo "  export     - Export leads to CSV file"
        echo "  stats      - Show database statistics"
        echo "  list       - List available backups"
        echo ""
        echo "Examples:"
        echo "  $0 backup"
        echo "  $0 restore leads_backup_20240101_120000.sql"
        echo "  $0 export"
        echo "  $0 stats"
        exit 1
        ;;
esac
