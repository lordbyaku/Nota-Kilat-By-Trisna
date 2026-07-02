@echo off
chcp 65001 >nul
title Nota Kilat — Sync ke GitHub

echo.
echo [96m=== Nota Kilat — Sync ke GitHub ===[0m
echo.

:: Cek apakah ada perubahan
git status --porcelain | findstr . >nul
if %errorlevel% neq 0 (
    echo [93mTidak ada perubahan untuk di-commit.[0m
    echo.
    pause
    exit /b
)

:: Tampilkan status
echo [90mPerubahan yang akan di-push:[0m
git status -s
echo.

:: Minta pesan commit
set /p commit_msg=[97mPesan commit (Enter untuk default): [0m
if "%commit_msg%"=="" set commit_msg=Update Nota Kilat

:: Add, commit, push
echo.
echo [90mMenambahkan file...[0m
git add -A

echo Meng-commit...[0m
git commit -m "%commit_msg%" >nul 2>&1
if %errorlevel% neq 0 (
    echo [91mCommit gagal. Tidak ada perubahan baru.[0m
    pause
    exit /b
)

echo Mendorong ke GitHub...[0m
git push
if %errorlevel% equ 0 (
    echo.
    echo [92mBerhasil! Perubahan sudah di-push ke GitHub.[0m
) else (
    echo.
    echo [91mPush gagal. Cek koneksi internet atau credential Git.[0m
)

echo.
pause
