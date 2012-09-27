var
	Economy = function(L0, K0, A0, alfa, delta, PMC) {

        function cobbDouglas(K, L, A) {
            return A*Math.pow(K, alfa)*Math.pow(L, (1- alfa));
        }

        function nextStep(policies) {

            this.Y= cobbDouglas(this.K, this.L, this.A);
            this.C= PMC * (this.Y -policies.T);
            this.I= this.C -policies.G;
            this.K= this.I -delta * this.K;
            this.Treasury += policies.T -policies.G;

            this.history.Y.push(this.Y);
            this.history.I.push(this.I);
            this.history.K.push(this.K);
            this.history.C.push(this.C);
            this.history.Treasury.push(this.Treasury);
        }

		return {
			Y: 0,
            C: 0,
            I: 0,
            K: K0,
            L: L0,
            A: A0,
            Treasury: 0,

            history: {
                Y: [],
                C: [],
                K: [],
                I: [],
                Treasury: []
            },

            next: nextStep
		};
    },

    Policy = function(g, t) {
        return {
            G: g,
            T: t
        };
    };


exports.economy = Economy;

var
    example = new Economy(40000, 100000, 1.2, 0.2, 0.05, 0.7);

for (var i=0; i < 50; i++)
    example.next({T: 6000, G: 4000});

console.log(example.history.Y);
console.log(example.history.K);