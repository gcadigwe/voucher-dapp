// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Voucher {

    // address public admin;
    address payable public reedeemer;
    address public creator;
    uint public value;

    event VoucherCreated (
        uint _value,
        address _creator,
        uint _voucher,
        uint _date
    );
    
    event VoucherReedeemed(
        uint _voucher,
        uint _value,
        address _reedeemer,
        uint _date
        );
    
    function sendEther() external payable {
        
    }

    mapping(address => mapping(uint => uint)) public coupons;
    mapping(uint => uint) public voucherPrice;

    // constructor(address _admin){
    //     admin = _admin;
    //     // reedeemer = _reedeemer;
        
    // }


    function createVoucher(uint _value, uint _voucher) public{
     
        coupons[msg.sender][_voucher] = _value;
        voucherPrice[_voucher] = _value;
        creator = msg.sender;

        emit VoucherCreated(_value,creator, _voucher,block.timestamp);
    }
    
    function balanceOf() external view returns(uint){
        return address(this).balance;
    }

    function reedemVoucher( uint _voucher) public {
        // require(_reedeemer == admin, 'creator cannot redeem coupon');
        // require(_reedeemer == reedeemer, 'cannot reedem');
        // _value = voucherPrice[_voucher];
        
        // _reedeemer = reedeemer;
        
        // require(voucherPrice[_voucher] == true, 'value does not match or voucher not found');
        
        value = voucherPrice[_voucher];
        
        reedeemer = payable(msg.sender);
        
        reedeemer.transfer(value);
    
        // msg.sender.transfer(msg.value);
        
        emit VoucherReedeemed(_voucher, value, reedeemer,block.timestamp);
        
    }
}