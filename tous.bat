@echo off
setlocal enabledelayedexpansion

REM Remplacer le chemin par le chemin complet vers votre dossier de projet
set "project_dir=C:\Users\thier\Documents\project-29"

REM Fichier de sortie
set "output_file=structure_full.txt"

echo Structure de projet pour %project_dir% : > "%output_file%"

REM Boucle à travers les fichiers et dossiers
for /r "%project_dir%" %%d in (*) do (
    set "file=%%d"
    set "file=!file:%project_dir%\=!"  REM Retirer le chemin du projet pour ne garder que la structure relative

    REM Vérifier si le fichier ou dossier commence par un point
    echo !file! | findstr /i /r /c:"^\.nuxt" /c:"^\.output" /c:"^node_modules" /c:"^package-lock.json" >nul
    if errorlevel 1 (
        REM Ajouter le fichier ou dossier à la sortie s'il ne correspond pas à une exclusion
        echo !file! >> "%output_file%"
    )
)

echo La structure a été enregistrée dans %output_file%.
