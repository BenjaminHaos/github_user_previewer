
function init(){

    switch_to_c9_project_directory;
    install_bundler;
    make_docs_directory_if_needed;
    make_readme_file_in_docs_folder_if_needed;
    make_gem_file_if_needed;
    install_jekyll_and_other_dependencies_from_gem_using_bundler;
    say_goodbye;
:<<'EOF'
EOF
}

function install_bundler(){
    gem install bundler;
}

function switch_to_c9_project_directory(){
    cd "$GOPATH";
}

function switch_to_repo_directory(){
    switch_to_c9_project_directory;
    local DIR;
    DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
    local DIR_TO_ACT_ON;
    DIR_TO_ACT_ON=${DIR%*/z_scripts}
    cd $DIR_TO_ACT_ON;
}

function switch_to_docs_directory(){
    switch_to_c9_project_directory;
    local DIR;
    DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
    local DIR_TO_ACT_ON;
    DIR_TO_ACT_ON=${DIR%*/z_scripts}
    cd $DIR_TO_ACT_ON/docs;
}

function make_docs_directory_if_needed(){
    switch_to_repo_directory;
    if [ ! -d "docs" ]; then
        echo "CREATING DOCS DIRECTORY.";
        mkdir docs;
    else
        echo "DOCS DIRECTORY EXISTS.";
    fi    
}

function make_gem_file_if_needed(){
    switch_to_docs_directory;
    if [ ! -e "Gemfile" ]; then
        echo "CREATING Gemfile in $PWD.";
        create_needed_gemfile_file;
    else
        echo "Gemfile Exists.";
        #echo "Gemfile Exists, appending lines needed.";
        #append_lines_to_existing_gemfile;
    fi    
}

function make_readme_file_in_docs_folder_if_needed(){
    switch_to_docs_directory;
    if [ ! -e "README.md" ]; then
        echo "CREATING README.md file in $PWD.";
        create_readme_file;
    else
        echo "README.md file Exists.";
    fi    
}

function create_readme_file(){
cat << 'EOF' > README.md
# GENERIC README FILE.
EOF
}

function create_needed_gemfile_file(){
cat << 'EOF' > Gemfile
source 'https://rubygems.org'
gem 'github-pages', group: :jekyll_plugins
EOF
}

# ToDo : Only append lines if they do not exist.
function append_lines_to_existing_gemfile(){
cat << 'EOF' >> Gemfile

source 'https://rubygems.org'
gem 'github-pages', group: :jekyll_plugins
EOF
}

function install_jekyll_and_other_dependencies_from_gem_using_bundler(){
    switch_to_docs_directory;
    bundle install;
}

function say_goodbye(){
    echo
    echo "Jekyll should now be ready to run."
    echo
    echo "Run with 'bundle exec jekyll serve' from docs folder in repo."
    echo
}
init
