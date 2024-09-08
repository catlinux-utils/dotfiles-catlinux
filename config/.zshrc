if [ "$TERM" != "linux" ]; then
  eval "$(oh-my-posh init zsh --config '/usr/share/oh-my-posh/themes/atomicBit.omp.json')"
fi

source /usr/share/zsh/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
source /usr/share/zsh/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh


autoload -Uz compinit
compinit

HISTFILE=~/.zsh_history
HISTSIZE=1000
SAVEHIST=1000

alias ls='lsd'
alias l='ls -l'
alias la='ls -a'
alias lla='ls -la'
alias lt='ls --tree'
alias cat='bat'
