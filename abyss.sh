#!/bin/bash

# ==========================================
# Neon Abyss Theme Installer
# ThemeBy : ⏤͟͟͞͞RiiwwxzLouise⊹
# Github  : https://github.com/riiwwxzofficial
# ==========================================

# Warna teks biar keren di terminal
CYAN='\033[0;36m'
PURPLE='\033[0;35m'
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${PURPLE}"
echo "=========================================="
echo "     NEON ABYSS THEME INSTALLER           "
echo "     ThemeBy : RiiwwxzLouise              "
echo "=========================================="
echo -e "${NC}"

# 1. Cek apakah user menjalankan sebagai root
if [[ $EUID -ne 0 ]]; then
   echo -e "${RED}Error: Script ini harus dijalankan sebagai root!${NC}" 
   echo "Coba jalankan dengan: sudo bash abyss.sh"
   exit 1
fi

# 2. Cek apakah folder panel Pterodactyl ada
if [ ! -d "/var/www/pterodactyl" ]; then
    echo -e "${RED}Error: Folder /var/www/pterodactyl tidak ditemukan!${NC}"
    echo "Pastikan Pterodactyl sudah terinstall di server ini."
    exit 1
fi

cd /var/www/pterodactyl

# 3. Backup file index.tsx sebelum diubah
echo -e "${CYAN}[1/5] Membuat backup file panel...${NC}"
cp resources/scripts/index.tsx resources/scripts/index.tsx.bak

# 4. Unduh file CSS dari GitHub kamu
echo -e "${CYAN}[2/5] Mengunduh file tema dari GitHub...${NC}"
# PERHATIAN: Ganti URL di bawah dengan URL raw GitHub kamu yang benar
CSS_URL="https://raw.githubusercontent.com/RiiwwxzNotDevelover/RiiwwxzLouiseTheme/main/assets/css/style.css"
curl -sL "$CSS_URL" -o resources/scripts/neon-abyss.css

if [ ! -s resources/scripts/neon-abyss.css ]; then
    echo -e "${RED}Gagal mengunduh CSS. Cek URL GitHub kamu.${NC}"
    mv resources/scripts/index.tsx.bak resources/scripts/index.tsx
    exit 1
fi

# 5. Masukkan import CSS ke index.tsx (jika belum ada)
echo -e "${CYAN}[3/5] Memasang tema ke sistem panel...${NC}"
if ! grep -q "neon-abyss.css" resources/scripts/index.tsx; then
    sed -i "1i import './neon-abyss.css';" resources/scripts/index.tsx
    echo "Import CSS berhasil ditambahkan."
else
    echo "Tema sudah terpasang sebelumnya."
fi

# 6. Build ulang panel
echo -e "${CYAN}[4/5] Melakukan build ulang (mohon tunggu 1-3 menit)...${NC}"
export NODE_OPTIONS=--openssl-legacy-provider
yarn build:production

# 7. Bersihkan cache
echo -e "${CYAN}[5/5] Membersihkan cache Laravel...${NC}"
php artisan view:clear
php artisan config:clear

echo -e "${GREEN}"
echo "=========================================="
echo "   INSTALASI SELESAI & BERHASIL!          "
echo "   Silakan refresh browser Anda (CTRL+F5) "
echo "   ThemeBy : RiiwwxzLouise                "
echo "=========================================="
echo -e "${NC}"

