if [ "$TERM" != "linux" ]; then
    #eval "$(oh-my-posh init zsh --config '/usr/share/oh-my-posh/themes/tokyo.omp.json')"
    eval "$(oh-my-posh init zsh --config '~/.config/ohmyposh/catlinux.json')"
fi

source /usr/share/zsh/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
source /usr/share/zsh/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh



autoload -Uz compinit
compinit

HISTFILE=~/.zsh_history
HISTSIZE=1000
SAVEHIST=1000
setopt appendhistory
setopt sharehistory
setopt hist_ignore_space
setopt hist_ignore_all_dups
setopt hist_save_no_dups
setopt hist_ignore_dups
setopt hist_find_no_dups

# Completion styling
zstyle ':completion:*' matcher-list 'm:{a-z}={A-Za-z}'
zstyle ':completion:*' menu yes

bindkey  "^[[H"   beginning-of-line
bindkey  "^[[F"   end-of-line
bindkey  "^[[3~"  delete-char


alias ls='lsd'
alias l='ls -l'
alias la='ls -a'
alias lla='ls -la'
alias lt='ls --tree'
alias cat='bat'

export HSA_OVERRIDE_GFX_VERSION=10.3.0

