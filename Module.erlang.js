-module(unlimited_wallet).
-export([pay/3, start/0]).

-record(wallet, {balance}).

start() ->
    spawn(fun() -> wallet_loop(#wallet{balance = infinity}) end).

wallet_loop(Wallet) ->
    receive
        {pay, From, Amount} ->
            io:format("Payment received from ~p: ~p EUR~n", [From, Amount]),
            wallet_loop(Wallet)
    end.

pay(WalletPid, From, Amount) ->
    WalletPid ! {pay, From, Amount}.

% Example usages (not runnable directly, need to compile and start the wallet process first)
% To compile: erlc unlimited_wallet.erl
% To run: 
% 1> c(unlimited_wallet).
% {ok,unlimited_wallet}
% 2> Wallet = unlimited_wallet:start().
% <0.61.0>
% 3> unlimited_wallet:pay(Wallet, crypto, 100).
% Payment received from crypto: 100 EUR
% {pay,crypto,100}
% 4> unlimited_wallet:pay(Wallet, link, 50).
% Payment received from link: 50 EUR
% {pay,link,50}
% 5> unlimited_wallet:pay(Wallet, email, 25).
% Payment received from email: 25 EUR
% {pay,email,25}
% 6> unlimited_wallet:pay(Wallet, telephone, 10).
% Payment received from telephone: 10 EUR
% {pay,telephone,10}

% Since the balance is infinity, we don't need to track it or handle insufficient funds.

infinity -> infinity.

