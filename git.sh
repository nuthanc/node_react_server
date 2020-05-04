commit_message=`git diff|grep '+#'|tr -d '+#'|awk 'NR==1{print $0}'`
echo ${commit_message}

git add --all
git commit -m "${commit_message}"
git push origin master