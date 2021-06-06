// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Voucher {

    address payable public reedeemer;
    address public creator;
    uint public value;

    event VoucherCreated (
        uint _value,
        address _creator,
        string _voucher,
        uint _date
    );
    
    event VoucherReedeemed(
        string _voucher,
        uint _value,
        address _reedeemer,
        uint _date
        );
    
    constructor()payable{
       
    }

    mapping(address => mapping(string => uint)) public coupons;
    mapping(string => uint) public voucherPrice;



    function createVoucher(uint _value, string memory _voucher) public{
     
        coupons[msg.sender][_voucher] = _value;
        voucherPrice[_voucher] = _value;
        creator = msg.sender;

        emit VoucherCreated(_value,creator, _voucher,block.timestamp);
    }
    
    function balanceOf() external view returns(uint){
        return address(this).balance;
    }

    function reedemVoucher( string memory _voucher, address payable _reedeemer) public {
        
        value = voucherPrice[_voucher];
        
        reedeemer = _reedeemer;
        
        reedeemer.transfer(value);
    
        // msg.sender.transfer(msg.value);
        
        emit VoucherReedeemed(_voucher, value, reedeemer,block.timestamp);
        
    }
}