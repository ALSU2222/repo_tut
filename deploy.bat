@REM Переход в папку результирущей страницы
cd ./dist

@REM создаем файл .nojekyll для обхода интерпретатора Jekyll Git
echo '' > .nojekyll

git init
git checkout -B master
git add -A
git commit -m "latest deploy"

git push -f https://github.com/ALSU2222/alsu_minutdinova.git master:dist

@REM возвращаеемся в рабочую папку
cd ..