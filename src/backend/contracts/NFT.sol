// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFT is ERC721URIStorage {
    uint public tokenCount;
    //  mapping(uint256 => string) private _tokenURIs;
    constructor() ERC721("Sourav", "SM"){}

    function mint(string memory _tokenURI) external returns(uint) {
        tokenCount++;
        _safeMint(msg.sender, tokenCount);
        _setTokenURI(tokenCount, _tokenURI);
        return(tokenCount);
    }
    //  function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
    //     _requireMinted(tokenId);

    //     string memory _tokenURI = _tokenURIs[tokenId];
    //     string memory base = _baseURI();

    //     // If there is no base URI, return the token URI.
    //     if (bytes(base).length == 0) {
    //         return _tokenURI;
    //     }
    //     // If both are set, concatenate the baseURI and tokenURI (via abi.encodePacked).
    //     if (bytes(_tokenURI).length > 0) {
    //         return string(abi.encodePacked(base, _tokenURI));
    //     }

    //     return super.tokenURI(tokenId);
    // }
    // function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual override{
    //     require(_exists(tokenId), "ERC721URIStorage: URI set of nonexistent token");
    //     _tokenURIs[tokenId] = _tokenURI;
    // }
    // function _requireMinted(uint256 tokenId) internal view virtual {
    //     require(_exists(tokenId), "ERC721: invalid token ID");
    // }
    // function _safeMint(
    //     address to,
    //     uint256 tokenId,
    //     bytes memory data
    // ) internal virtual {
    //     _mint(to, tokenId);
    //     require(
    //         _checkOnERC721Received(address(0), to, tokenId, data),
    //         "ERC721: transfer to non ERC721Receiver implementer"
    //     );
    // }
}