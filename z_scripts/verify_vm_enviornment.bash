
# Test if script is being called from Cloud9 environment.
if [ -z ${C9_USER+x} ]
then
    echo "Script called from non Cloud9 environment.";
    # Setup ssh keys for remote.
    eval $(ssh-agent -s)
    eval $(ssh-add "../ssh_keys/id_rsa")
else
    echo "Script called from Cloud9 environment(C9). C9 User = '$C9_USER'"; 
fi
