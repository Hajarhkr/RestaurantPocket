Make Sure you are in the master /main branch because that' what i want to merge to
#Git Commands
* git pull origin main 

//this fetches all the code from the remote and it merges it into our mainbranch because that's what we indicated after origin. from the main branch from the remote to our main branch onto our local//

## Working on a new feature = checking out a new branch 
// to preserve the state of the master branch to not edit and potentially mess it up --> Switch to a nex branch 

* git checkout -b INSERT_BRANCH_NAME 

//After changes

1. <u>Command:</u>: git add .
   
2. <u>Command:</u>: git commit -m "Say whatever here"
   
   /*make sure you've already checked oyt the branch (git checkout -b INSERT_bBRANCH_NAME)*/
3. <u>Command:</u>: git push origin INSERT_BRANCH_NAME
   
4. <u>Instruction:</u>go to github repository see the new branch and comment on your changes
   
5. <u>Instruction:</u> click on create pull request
   
6. <u>Instruction:</u> Assign reviewers
   
7. **case 1**:if all reviews are happy with it
    1.  <u>Instruction:</u> click *merge pull request* that will merge it in the main branch
    
    **case 2**: if there a review requesting change (suggesting a new feature)
     /*pull down the main branch just in case anyone has done some changes to the branch*/
    1.   <u>Command:</u> git checkout main

     /*updating changes of the main branch in the code*/
    2.   <u>Command:</u> git pull origin main

     /*checkout a new branch for the feature*/
    3.   <u>Command:</u> git checkout -b INSERT_NEW_BRANCH_NAME
 
    4.   <u>Instruction:</u> Repeat 1-->6









