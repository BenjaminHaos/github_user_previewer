function init() {
    bash <(curl -s https://gist.githubusercontent.com/BenjaminHaos/d56b415a1959398da81328dbc704c2b8/raw/setup_gitflow_and_gitflow_completion_ON_CLOUD9_CLICKABLE.bash);
    bash <(curl -s https://gist.githubusercontent.com/BenjaminHaos/97419790c4a4c604873f66b83033de73/raw/update_npm_and_node_on_CLOUD9_is_CLICKABLE.bash) --fast;
    kill $PPID         # kill this script's parent
}

init
printf "Hello World?\n"