play --plot gnuplot 1.wav compand 0.3,1 6:-40,-30,-20 -5 -90 0.2 > 1.plt
(echo set terminal png ; echo set output \"1.png\"; cat 1.plt) | gnuplot
