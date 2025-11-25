{
	description = "dev shell for scalara coding challenge";
	inputs = {
		nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
	};

	outputs = { self, nixpkgs }:
	let
		pkgs = import nixpkgs {
			system = "x86_64-linux";
			config.allowUnfree = true;
		};
	in
	{
		devShell."x86_64-linux".default = pkgs.mkShell {
			packages = with pkgs; [
				nodejs
				yarn
				docker
				docker-compose
				nest-cli
				jetbrains.webstorm
			];
		};
	};
}
