# How to Contribute to Cormas

This tutorial will teach you how to contribute to Cormas by resolving issues and making pull requests to [our repository](https://github.com/cormas/cormas) on GitHub.

**Prerequisite:** Before going any further, you need to make sure that you have a GitHub account and that you can authenticate with SSH keys. Follow those steps from our [GitHub tutorial](github):

1. [Create a GitHub account](github?id=step-1-create-a-github-account)
2. [Generate SSH keys](github?id=step-2-generate-ssh-keys)

## Select an issue

All issues Cormas-related issues are recorded on our [issue tracker](https://github.com/cormas/cormas/issues). You can open it be clicking on the _"Issues"_ button on [our repository](https://github.com/cormas/cormas). 

![](_media/contributing/issues-button.png)
 
You will see the list of open issues. Most issues will have one or multiple labels associated with them. If you are a newcomer, we recommend that you start with [good first issue](https://github.com/cormas/cormas/issues?q=is%3Aissue%20state%3Aopen%20label%3A%22good%20first%20issue%22) label. Those issues are selected by experienced developers as a recommended practice for new contributors. They are usually small and easy to resolve.

![](_media/contributing/good-first-issue.png)

In this tutorial, I will be working on [issue #699](https://github.com/cormas/cormas/issues/699) which asks to add a _"Browse"_ option to the context menu of the entity. I click on the issue, read its description and the discussion section. Then I **leave a comment** indicating that I am working on it. This will prevent other contributors from taking on the same issue.

![](_media/contributing/comment-on-issue.png)

## Create a fork

Since you don't have access to commit to Cormas repository directly, you must create a [fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo) - a copy of this repository on your GitHub account. You will modify this fork and then submit the changes to the original repository as a [pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests). We (Cormas developers) will review your proposed changes and either accept (merge) them or ask you to change something. You can create a fork by clicking on the _"Fork"_ button in the top-right corner of [our repository](https://github.com/cormas/cormas).

![](_media/contributing/fork.png)

You can leave all the default settings (repository name, your GitHub account, description, etc.) but be sure to uncheck the checkbox _"Copy the master branch only"_ because you will be working on the `dev` branch.

![](_media/contributing/fork-copy-branch.png)

After you click on the _"Create fork"_ button, the new fork will be created and opened automatically. 

You will see that repository is now linked tou your account. There will also be an indication that the `master` branch of your fork is up to date with the `master` branch of the original cormas repository.

![](_media/contributing/fork-result.png)

## Create a new Pharo image and load Cormas

[Create and open](install?id=step-2-create-a-pharo-image) a new Pharo image. In the Playground, execute the following script but **replace my username** (olekscode) **with yours**:

```st
Metacello new
    repository: 'github://olekscode/cormas:dev';
    baseline: 'Cormas';
    load.
```

This step is the same as the [Loading Cormas](install?id=loading-cormas) section of the [installation tutorial](install) but instead of loading the `master` branch of the central repository with `github://cormas/cormas`, we load the `dev` branch of our fork with `github://<username>/cormas:dev`.

## Specify your SSH keys

Now we must specify the location of our SSH keys to make sure that Pharo image can authenticate to GitHub and make commits from your account. If you don't have the SSH keys yet, please follow the [Generate SSH keys](github?id=step-2-generate-ssh-keys) step of our [GitHub tutorial](github). Click on _"Browse"_ in the world menu and then on _"Git Repositories Browser"_ (a tool also known as _"Iceberg"_). 

![](_media/contributing/iceberg-menu.png)

Now click on the _"Settings"_ button in the top-right corner of the repositories browser.

![](_media/contributing/iceberg-settings-button.png)

In the settings browser, select _"Credentials"_, check the _"Use custom SSH keys..."_ checkbox and make sure that both public and private SSH keys point to the correct location on your computer. Now you can close the settings browser, your changes will be automatically saved.

![](_media/contributing/iceberg-ssh-keys.png)

## Create a new branch for issue

It is possible that while you make your changes, someone else will push their own changes to Cormas.
Then you will be forced to pull those changes and resolve potential conflicts before pushing your own changes.
To simplify this process, it is a good practice to create a separate branch for the issue that you are resolving and, once you are done, make a pull request merging this branch into the original branch (dev).

Pharo automates all this process for you.
In _"Git Repositories Browser"_ (Iceberg), right-click on _cormas_, select _"GitHub"_ and then _"Create new branch for issue"_.

![](_media/contributing/new-branch-for-issue.png)

You must now specify the remote repository that has the list of issues.
This should be the central Cormas repository.
But at this point, Pharo only has the link to your remote repository.
So we must add another remote.
To do that, click on the _"Add remote"_ button (the one with a green plus "+").

![](_media/contributing/new-branch-for-issue-window.png)

Now give the name to your remote.
I call mine "cormas" but you can choose any name that you like.
Remote URL should be the SSH address that you copy on GitHub.
For Cormas repository it's _"git@github.com:cormas/cormas.git"_.
Once you have completed both fields, click on the _"OK"_ button.

![](_media/contributing/new-branch-for-issue-add-remote.png)

Sometimes, this action will produce an error similar to the one below.
This is a bug of Git Repositories Manager.
You can ignore it and simpy close the debugger window.

![](_media/contributing/new-branch-for-issue-bug.png)

Now you can select Cormas repository from the list of remotes.
Write the issue number in the second field.
The number of my issue is 699 - it's the issue that I selected in the [Select an issue](#select-an-issue) section of this tutorial.
If you did everything correctly, the branch name field will be auto-completed with your issue title that will be automatically retrieved from GitHub.

![](_media/contributing/new-branch-for-issue-number.png)

Once you click _"OK"_, the new branch will be created.
You can see the name of this branch next in the _"Branch"_ column of the _"Repositories"_ table.

![](_media/contributing/new-branch-for-issue-result.png)

## Make changes

## Commit and push

## Open a pull request